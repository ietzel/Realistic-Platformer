class Creature {
    // Constructor updated to accept isPlayer flag
    constructor(name, isPlayer = false) { 
        this.name = name;
        this.coreSkills = [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ];
        this.MBTI = [
            0, 0, 0, 0, //IXXJ <-exchanges-> EXTP, EXFP, EXFP, EXTP 
            0, 0, 0, 0, //IXXP <-exchanges-> ESXJ, ESXJ, ENXJ, ENXJ
            0, 0, 0, 0, //EXXJ <-exchanges-> ISXP, ISXP, INXP, INXP
            0, 0, 0, 0  //EXXP <-exchanges-> IXTJ, IXFJ, IXFJ, IXTJ
        ];
        // --- Physics Properties ---
        this.radius = 16;
        this.x = 0;
        this.y = 0;
        this.dy = 0;

        this.isPlayer = isPlayer; // Indicates if this creature is the player character

        // --- AI State Variables ---
        this.actionTimer = 0; // Frames until new action is chosen
        this.currentHDir = 0; // 0: None, 1: Right, -1: Left
        this.causeandeffect()
    }
    
    /**
     * The core update method handling both AI decisions and physics movement.
     * @param {boolean} [isPressingLeft] - Player input for moving left. If false, AI takes over.
     * @param {boolean} [isPressingRight] - Player input for moving right. If false, AI takes over.
     * @param {boolean} [shouldJump] - Player input for jumping. If false, AI takes over.
     */
    update(isPressingLeft = false, isPressingRight = false, shouldJump = false) {
        const CLING_DETECTION_RANGE = PLAYER_SPEED + 1;
        let newX = this.x;
        
        // Check if this creature is AI controlled (i.e., no player input)
        const isAIControlled = !(isPressingLeft || isPressingRight || shouldJump);

        let onGround = checkCollision(this.x, this.y + 1); 
        let isCollidingLeft = checkCollision(this.x - CLING_DETECTION_RANGE, this.y);
        let isCollidingRight = checkCollision(this.x + CLING_DETECTION_RANGE, this.y);
        
        // --- 0. AI Decision Making (Wandering) ---
        // Only run wandering AI if it is NOT the player AND there is no external input
        if (this.isPlayer === false && isAIControlled) { 
            // Decrease timer and check if a new action is needed
            this.actionTimer--;
            if (this.actionTimer <= 0) {
                this.actionTimer = Math.floor(Math.random() * 100) + 50; // 50 to 150 frames
                let action = Math.random();

                if (action < 0.33) {
                    this.currentHDir = 1; // Move right
                } else if (action < 0.66) {
                    this.currentHDir = -1; // Move left
                } else {
                    this.currentHDir = 0; // Stop
                }
            }
            
            // Check for walls/ledges and force a jump
            if (onGround && ( (this.currentHDir === 1 && isCollidingRight) || (this.currentHDir === -1 && isCollidingLeft) ) ) {
                 shouldJump = true;
                 this.actionTimer = 50; // Shorten timer to reassess after jump
            }
            
            // Set movement intent based on AI direction
            if (this.currentHDir === 1) isPressingRight = true;
            if (this.currentHDir === -1) isPressingLeft = true;
        }

        // --- 1. Horizontal Movement (Player/AI Input + Wall Jump Impulse) ---

        let isWallClinging = (!onGround) && 
                       ( (isCollidingLeft && isPressingLeft) || (isCollidingRight && isPressingRight) );
        
        let h_impulse = 0;
        
        // Check for Wall Jump first
        if (isWallClinging && shouldJump) {
            this.dy = -JUMP_FORCE * 0.7; // Vertical impulse (Jump up) - SLOWED DOWN

            // Horizontal impulse AWAY from the wall
            if (isCollidingLeft) {
                h_impulse = JUMP_FORCE * 0.4; // Jump right (away from left wall) - SLOWED DOWN
            } else if (isCollidingRight) {
                h_impulse = -JUMP_FORCE * 0.4; // Jump left (away from right wall) - SLOWED DOWN
            }
            isWallClinging = false; // Creature immediately leaves the wall upon jumping
        }
        
        // Normal Horizontal Movement
        if (h_impulse === 0) { // Only apply key/AI movement if not wall-jumping
            if (isPressingLeft) newX -= PLAYER_SPEED;
            if (isPressingRight) newX += PLAYER_SPEED;
        } else {
            newX = this.x + h_impulse; // Apply wall jump impulse
        }

        // Check and apply horizontal movement
        if (!checkCollision(newX, this.y)) {
            this.x = newX;
        }

        // --- 2. Vertical Movement (Gravity + Jump + Cling) ---

        // Wall Cling behavior: Reduce downward velocity to simulate sticking.
        if (isWallClinging) {
            // Cap downward velocity at a small number (G/2) for a slow slide
            if (this.dy > G / 2) { 
                this.dy = G / 2;
            }
        } else {
            // Normal gravity application
            this.dy += G; 
        }
        
        // Ground Jump (Applies only if on the ground and not handled by wall jump)
        if (shouldJump && onGround) {
            this.dy = -JUMP_FORCE; // Upward impulse
        }
        
        // --- 3. Robust Vertical Collision (Sweeping) ---
        // We apply vertical movement step-by-step (1 pixel at a time) to prevent tunneling.
        let step = Math.sign(this.dy); 
        let maxSteps = Math.abs(this.dy);
        
        // Use Math.ceil to ensure even fractional velocities result in at least one step check.
        for (let i = 0; i < Math.ceil(maxSteps); i++) {
            let nextY = this.y + step;
            
            if (checkCollision(this.x, nextY)) {
                this.dy = 0;
                break; // Stop the loop and end vertical movement for this frame
            } else {
                this.y = nextY;
            }
        }

        // --- 4. Clamping to Screen Boundaries (NEW) ---
        // This prevents the creature from moving off-screen, a necessary measure 
        // after removing the border collision detection in checkCollision.
        const oldY = this.y;
        
        this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
        this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));

        // If the creature was clamped down (e.g., falling through the floor due to a bug), 
        // reset vertical velocity
        if (oldY !== this.y && this.y === canvas.height - this.radius) {
            this.dy = 0;
        }
    }

    causeandeffect(cause, effect) {
        let skillPhase = Math.floor(cause/10);
        let skillDISC = cause%5;
        ctx.fillStyle = '#FFF';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        let text = 'N/A';
        //text = causeEffectMatrix[cause][effect];
        if(cause<50) {
            let mult = mult*2;
        }
        if(skillDISC == 4) {
            for(i=0;i<this.coreSkills.length;i++) {
                let mult = 1;
                if(Math.ceil(i/10)==skillPhase) {
                    mult *= 2;
                }
                if((i%5)==skillDISC) {
                    mult *= 2;
                }
                this.coreSkills[i] += mult;
                this.MBTI[Math.floor(Math.ceil(i/12.5))] += mult;
            }
        } else {
            for(i=0;i<10;i++) {
                let mult = 1;
                if(Math.ceil(i/10)==skillPhase) {
                    mult *= 2;
                }
                if((i%5)==skillDISC) {
                    mult *= 2;
                }
                this.coreSkills[(i*5)+skillDISC] += mult;
                this.MBTI[Math.floor(Math.ceil(i/2.5))] += mult;
            }
        }
        ctx.fillText(text, canvas.width / 2, 80);
    }
    
    // Draw method now uses internal position (this.x, this.y) and sets color based on name/collision
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        
        let baseColor;
        if (this.name === "Player") {
            // Player is green
            baseColor = '#00FF00'; 
        } else {
            // NPCs are maroon for iridescent maroon
            baseColor = '#800000';
        }
        
        // If colliding, change to red for both
        ctx.fillStyle = checkCollision(this.x, this.y) ? '#FF0000' : baseColor; 
        ctx.fill();
    }
    
    // The original methods remain below...
    intimidate(targetindex) {
        //causeandeffect(0, targetindex);
    } 
    athletics(targetindex) {
        //causeandeffect(1, targetindex);
    } 
    engineering(targetindex) {
        //causeandeffect(2, targetindex);
    } 
    physicalscience(targetindex) {
        //causeandeffect(3, targetindex);
    } 
    bluff(targetindex) {
        //causeandeffect(4, targetindex);
    } 
    diplomacy(targetindex) {
        //causeandeffect(5, targetindex);
    } 
    perform(targetindex) {
        //causeandeffect(6, targetindex);
    } 
    linguistics(targetindex) {
        //causeandeffect(7, targetindex);
    } 
    medicine(targetindex) {
        //causeandeffect(8, targetindex);
    } 
    profession(targetindex) {
        //causeandeffect(9, targetindex);
    } 
    craft(targetindex) {
        //causeandeffect(10, targetindex);
    } 
    survival(targetindex) {
        //causeandeffect(11, targetindex);
    } 
    perception(targetindex) {
        //causeandeffect(12, targetindex);
    } 
    computers(targetindex) {
        //causeandeffect(13, targetindex);
    } 
    lifescience(targetindex) {
        //causeandeffect(14, targetindex);
    } 
    sensemotive(targetindex) {
        //causeandeffect(15, targetindex);
    } 
}