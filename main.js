const BLOCK_SIZE = 32;
const MAP_WIDTH = canvas.width / BLOCK_SIZE;
const MAP_HEIGHT = canvas.height / BLOCK_SIZE;
let MAP = []; // Change const to let
const PLAYER_SPEED = 2;
const keys = { w: false, a: false, s: false, d: false };
const JUMP_FORCE = 10;
const G = 0.5; // Adjusted gravity back to 0.5 for gameplay reasons, replacing the physics-incorrect 9.81

// --- Helper function for random stat allocation ---
function allocateRandomStats(totalPoints) {
    let stats = [1, 1, 1, 1]; // Base stats
    let pointsRemaining = totalPoints - 4;
    
    for (let i = 0; i < pointsRemaining; i++) {
        let randomIndex = Math.floor(Math.random() * 4);
        stats[randomIndex]++;
    }
    
    console.log("Player Starting Stats:", stats);
    return stats;
}

// --- Helper function for ability checks ---
function performAbilityCheck(abilityIndex) {
    const success = Math.random() < 0.5; // 50% chance of success
    
    if (success) {
        const bonus = PC.abilityScores[abilityIndex];
        console.log(`%cAbility check ${abilityIndex + 1} SUCCEEDED! Adding +${bonus} to all stats.`, 'color: #00FF00');
        
        for (let i = 0; i < PC.abilityScores.length; i++) {
            PC.abilityScores[i] += bonus;
        }
    } else {
        console.log(`%cAbility check ${abilityIndex + 1} FAILED!`, 'color: #FF0000');
    }
    console.log("Current Stats:", PC.abilityScores);
}


// --- Aerospace Mission Status (NEW) ---
const AEROSPACE_MISSION = {
    // Progress is a value between 0 and 100 for each industry
    Construction_Utilities: 0,
    Diplomacy_Legal: 0,
    Education_Scientific: 0,
    Food_Resources: 0, 
    Hospitality_Health: 0, 
    
    MissionReadiness: 0, // Overall readiness score (0-100)
    stage: 1, // 1: Infrastructure, 2: R&D, 3: Launch Prep, 4: Mission Ongoing
    isReady: false
};

// Player position is now handled by the PC (Creature) object.

var NPCs = [];

for(i=0; i<4; i++) {
  // Pass isPlayer=false and set initial position
  let NPC = new Creature(i.toString(), [i, i, i, i], false); 
  NPC.x = (12 * BLOCK_SIZE) + BLOCK_SIZE / 2 + (i * BLOCK_SIZE * 2); 
  NPC.y = (10 * BLOCK_SIZE) + BLOCK_SIZE / 2;
  NPCs.push(NPC);
}

// 1. Generate a 1D heightmap with smooth noise function
function generateHeightmap(width, height) {
  const heightmap = [];
  let currentHeight = height / 2;
  let noiseFactor = 0.5;
  for (let x = 0; x < width; x++) {
    currentHeight += (Math.random() - 0.5) * 4 * noiseFactor;
    currentHeight = Math.max(height * 0.2, Math.min(height * 0.8, currentHeight));
    heightmap.push(Math.floor(currentHeight));
  }
  return heightmap;
}

// 2. Carve tunnels through the map
function carveTunnels(map, startX, startY, length, maxTurns) {
  let x = startX;
  let y = startY;
  let direction = Math.floor(Math.random() * 4);
  let turns = 0;
  for (let i = 0; i < length && turns < maxTurns; i++) {
    if (x >= 0 && x < MAP_WIDTH && y >= 0 && y < MAP_HEIGHT) {
      map[y][x] = 0;
      let nextX = x;
      let nextY = y;
      switch (direction) {
        case 0: nextY--; break;
        case 1: nextX++; break;
        case 2: nextY++; break;
        case 3: nextX--; break;
      }
      if (Math.random() < 0.1 || nextX < 0 || nextX >= MAP_WIDTH || nextY < 0 || nextY >= MAP_HEIGHT) {
        direction = Math.floor(Math.random() * 4);
        turns++;
      } else {
        x = nextX;
        y = nextY;
      }
    }
  }
}

// 3. Main generation logic
function generateEnvironment() {
  MAP = [];
  for (let y = 0; y < MAP_HEIGHT; y++) {
    MAP[y] = [];
    for (let x = 0; x < MAP_WIDTH; x++) {
      MAP[y][x] = 1;
    }
  }
  const heightmap = generateHeightmap(MAP_WIDTH, MAP_HEIGHT);
  for (let x = 0; x < MAP_WIDTH; x++) {
    for (let y = 0; y < heightmap[x]; y++) {
      MAP[y][x] = 0;
    }
  }
  const startX = Math.floor(Math.random() * MAP_WIDTH);
  const startY = Math.floor(heightmap[startX] + 1);
  carveTunnels(MAP, startX, startY, 500, 50);
}

// 4. Drawing the map
function drawMap() {
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      if (MAP[y][x] === 1) {
        ctx.fillStyle = '#964B00';
        ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

// 5. Improved collision detection for a circle
// Checks all four corners of the player's bounding box
function checkCollision(x, y) {
  // Use Creature radius (16) for consistency, replacing old player.radius
  const radius = 16;
  const halfSize = radius * 4 / 5;
  const pointsToCheck = [
    [x - halfSize, y - halfSize], // Top-left
    [x + halfSize, y - halfSize], // Top-right
    [x - halfSize, y + halfSize], // Bottom-left
    [x + halfSize, y + halfSize] // Bottom-right
  ];

  for (const [px, py] of pointsToCheck) {
    const gridX = Math.floor(px / BLOCK_SIZE);
    const gridY = Math.floor(py / BLOCK_SIZE);
    // NEW LOGIC: If out of map bounds, do NOT register a collision. 
    // This prevents clinging/wall-jumping on screen borders.
    if (gridX < 0 || gridX >= MAP_WIDTH || gridY < 0 || gridY >= MAP_HEIGHT) {
      continue; // Skip this point, treating the space as non-collidable (empty)
    }
    
    // Safety check: ensure MAP[gridY] exists before accessing [gridX]
    if (MAP[gridY] && MAP[gridY][gridX] === 1) { 
      return true; // Collision detected with a solid block
    }
  }
  return false; // No collision
}

const startingStats = allocateRandomStats(16);
let PC = new Creature("Player", startingStats, true);

// Set initial PC position manually (since the global 'player' is gone)
PC.x = (10 * BLOCK_SIZE) + BLOCK_SIZE / 2;
PC.y = (10 * BLOCK_SIZE) + BLOCK_SIZE / 2;

// 6. Draw the player
function drawPlayer() {
  PC.draw(); // PC.draw now uses internal x, y
  ctx.fillStyle = '#FFF';
  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('Use WASD to move the circle!', canvas.width / 2, 20);
}

// 7. updatePlayer removed, logic moved to PC.update()

// --- NEW: Mission Update Logic (Omitted for brevity, but still present in file) ---
function updateMission() {
    const BASE_PROGRESS_RATE = 0.01; // Slow constant progress per frame
    
    // Player Ability Score Influence (sum of all 4 scores / 200, provides a small percentage bonus)
    const totalAbilityScore = 16;
    const pcAbilityBonus = totalAbilityScore / 200; 
    
    // Apply baseline progress and a small PC-dependent bonus
    AEROSPACE_MISSION.Construction_Utilities += BASE_PROGRESS_RATE + (pcAbilityBonus * 0.01);
    AEROSPACE_MISSION.Diplomacy_Legal += BASE_PROGRESS_RATE; 
    AEROSPACE_MISSION.Education_Scientific += BASE_PROGRESS_RATE + (pcAbilityBonus * 0.02); 
    
    // Updated industry progress logic:
    AEROSPACE_MISSION.Food_Resources += BASE_PROGRESS_RATE + (pcAbilityBonus * 0.005);
    AEROSPACE_MISSION.Hospitality_Health += BASE_PROGRESS_RATE + (pcAbilityBonus * 0.005);

    // Cap progress at 100
    for (let key in AEROSPACE_MISSION) {
        if (key !== 'MissionReadiness' && key !== 'stage' && key !== 'isReady') {
            AEROSPACE_MISSION[key] = Math.min(100, AEROSPACE_MISSION[key]);
        }
    }
    
    // Calculate overall readiness as an average
    let totalProgress = 
        AEROSPACE_MISSION.Construction_Utilities +
        AEROSPACE_MISSION.Diplomacy_Legal +
        AEROSPACE_MISSION.Education_Scientific +
        AEROSPACE_MISSION.Food_Resources +
        AEROSPACE_MISSION.Hospitality_Health;
        
    AEROSPACE_MISSION.MissionReadiness = totalProgress / 5; // Average of 5 categories
    
    // Update Mission Stage
    if (AEROSPACE_MISSION.MissionReadiness >= 100) {
        AEROSPACE_MISSION.isReady = true;
        AEROSPACE_MISSION.stage = 4; // Mission Ongoing
    } else if (AEROSPACE_MISSION.MissionReadiness >= 75) {
        AEROSPACE_MISSION.stage = 3; // Launch Prep
    } else if (AEROSPACE_MISSION.MissionReadiness >= 40) {
        AEROSPACE_MISSION.stage = 2; // R&D & Design
    } else {
        AEROSPACE_MISSION.stage = 1; // Infrastructure & Legal Framework
    }
}

// --- NEW: Draw Mission Status (Omitted for brevity, but still present in file) ---
function drawMissionStatus() {
    ctx.fillStyle = '#ADD8E6'; // Light blue
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    
    let y_start = 40;
    let line_height = 15;
    
    // Draw overall status
    let statusText = AEROSPACE_MISSION.isReady ? 'LAUNCHED!' : `Stage: ${AEROSPACE_MISSION.stage}`;
    ctx.fillText(`AEROSPACE MISSION: ${statusText}`, 10, y_start);
    ctx.fillText(`Readiness: ${AEROSPACE_MISSION.MissionReadiness.toFixed(1)}%`, 10, y_start + line_height);

    // Draw industry progress
    let i = 0;
    for (const [key, value] of Object.entries(AEROSPACE_MISSION)) {
        if (key !== 'MissionReadiness' && key !== 'stage' && key !== 'isReady') {
            // Note: The display key still works for Food_Resources to show "Food Resources"
            let displayKey = key.replace('_', ' '); 
            ctx.fillText(`${displayKey}: ${value.toFixed(1)}%`, 10, y_start + line_height * (i + 2));
            i++;
        }
    }
}

// 8. The main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // --- MISSION UPDATE ---
  updateMission();

  // --- Creature Update ---
  // PC.update handles movement and physics based on key input
  PC.update(keys.a, keys.d, keys.w); 

  // NPCs update using their internal AI
  for(i=0; i<NPCs.length; i++) {
    NPCs[i].update(); 
  }
  
  drawMap();
  drawPlayer();
  
  // Draw NPCs using their internal position
  for(i=0; i<NPCs.length; i++) {
    NPCs[i].draw(); 
  }
  
  // --- DRAW MISSION STATUS ---
  drawMissionStatus();
  
  requestAnimationFrame(gameLoop);
}

// Event listeners for key presses
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'w': keys.w = true; break;
    case 'a': keys.a = true; break;
    case 's': keys.s = true; break;
    case 'd': keys.d = true; break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.key) {
    // Movement keys
    case 'w': keys.w = false; break;
    case 'a': keys.a = false; break;
    case 's': keys.s = false; break;
    case 'd': keys.d = false; break;
    
    // Ability Check keys (1, 2, 3, 4 map to index 0, 1, 2, 3)
    case '1': performAbilityCheck(0); break;
    case '2': performAbilityCheck(1); break;
    case '3': performAbilityCheck(2); break;
    case '4': performAbilityCheck(3); break;
  }
});

generateEnvironment();
gameLoop();