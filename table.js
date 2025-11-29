// -----------------------------------------------------------------------------
// 1. CORE SKILL DEFINITIONS (50 skills, categorized by type)
// -----------------------------------------------------------------------------

const coreSkills = [
  // Scientific Technical Professional Services Analysis
  { name: 'Problem identification', type: 'D' },
  { name: 'Curiosity', type: 'I' },
  { name: 'Active listening', type: 'S' },
  { name: 'Critical thinking', type: 'C' },
  { name: 'Strategic thinking', type: 'W' },
  // Education Design
  { name: 'Adaptability', type: 'D' },
  { name: 'Creativity', type: 'I' },
  { name: 'Collaboration', type: 'S' },
  { name: 'Persistence', type: 'C' },
  { name: 'Storytelling', type: 'W' },
  // Construction Planning
  { name: 'Decision-making', type: 'D' },
  { name: 'Resourcefulness', type: 'I' },
  { name: 'Prioritization', type: 'S' },
  { name: 'Organizational skills', type: 'C' },
  { name: 'Goal-setting', type: 'W' },
  // Health Testing
  { name: 'Hypothesis-driven solution discovery', type: 'D' },
  { name: 'User research', type: 'I' },
  { name: 'Problem definition', type: 'S' },
  { name: 'Reporting', type: 'C' },
  { name: 'Competitive analysis', type: 'W' },
  // Utilities Implementation
  { name: 'Resource allocation', type: 'D' },
  { name: 'Workflow automation', type: 'I' },
  { name: 'Project scheduling', type: 'S' },
  { name: 'Data visualization', type: 'C' },
  { name: 'Logistics', type: 'W' },
  // Legal Review
  { name: 'Evaluation', type: 'D' },
  { name: 'Work quality', type: 'I' },
  { name: 'Objectivity', type: 'S' },
  { name: 'Attention to detail', type: 'C' },
  { name: 'Reflection', type: 'W' },
  // Food Deployment
  { name: 'Technical issue resolution', type: 'D' },
  { name: 'Go-live management', type: 'I' },
  { name: 'Business process mapping', type: 'S' },
  { name: 'Process improvement', type: 'C' },
  { name: 'Infrastructure management', type: 'W' },
  // Hospitality Release
  { name: 'Negotiation', type: 'D' },
  { name: 'Marketing campaign management', type: 'I' },
  { name: 'Stakeholder communication', type: 'S' },
  { name: 'Content management', type: 'C' },
  { name: 'Copywriting', type: 'W' },
  // Natural Resources Maintenance
  { name: 'Troubleshooting', type: 'D' },
  { name: 'Diagnostics', type: 'I' },
  { name: 'Preventive maintenance', type: 'S' },
  { name: 'Documentation', type: 'C' },
  { name: 'Office management', type: 'W' },
  // Diplomacy Feedback
  { name: 'Accountability', type: 'D' },
  { name: 'Interpersonal communication', type: 'I' },
  { name: 'Empathy', type: 'S' },
  { name: 'Open-mindedness', type: 'C' },
  { name: 'Humility', type: 'W' },
];

const GIVE_MESSAGES = [
  'A laser-focused effort on **Problem identification** directly translated into a successful launch of **{{EFFECT_SKILL}}**, significantly decreasing revision cycles.',
  'The pursuit of **Curiosity** unlocked unconventional pathways, giving the project team unexpected intellectual capital that fortified **{{EFFECT_SKILL}}**.',
  'Proactive **Active listening** established profound trust, ensuring all unspoken requirements were met, which validated the approach for **{{EFFECT_SKILL}}**.',
  'The structural rigor derived from **Critical thinking** served as a strong quality assurance mechanism, guaranteeing high integrity for **{{EFFECT_SKILL}}**.',
  'Forward-looking **Strategic thinking** secured long-term competitive advantages, turning short-term execution into lasting value for **{{EFFECT_SKILL}}**.',
  '**Adaptability** was the core defensive driver, enabling seamless recovery from unexpected changes, preserving momentum toward **{{EFFECT_SKILL}}**.',
  'The high degree of **Creativity** infused into the project resulted in a unique value proposition, capturing market attention vital for **{{EFFECT_SKILL}}**.',
  'Proactive **Collaboration** dissolved organizational silos, allowing shared resources to be utilized with peak efficiency during **{{EFFECT_SKILL}}**.',
  'Unwavering **Persistence** systematically overcame structural bottlenecks, ensuring the project completed its most challenging phase for **{{EFFECT_SKILL}}**.',
  'Masterful **Storytelling** simplified complex goals for mass communication, ensuring every stakeholder championed the vision for **{{EFFECT_SKILL}}**.',
  'Swift and evidence-based **Decision-making** unlocked blocked progress points, creating significant savings in time and labor expenditure for **{{EFFECT_SKILL}}**.',
  '**Resourcefulness** transformed constraints into unique advantages, successfully delivering high-impact results for **{{EFFECT_SKILL}}** despite limitations.',
  'Meticulous **Prioritization** ensured peak effort was aligned with the highest-leverage tasks, dramatically improving the ROI of **{{EFFECT_SKILL}}**.',
  'Impeccable **Organizational skills** streamlined documentation and asset management, which served as a robust backbone for **{{EFFECT_SKILL}}**.',
  'Clear **Goal-setting** provided the navigational beacon, ensuring all sub-tasks directly contributed to the overarching mission of **{{EFFECT_SKILL}}**.',
  'The discipline of **Hypothesis-driven solution discovery** ensured R&D efforts were tightly focused and highly convertible toward **{{EFFECT_SKILL}}**.',
  'Empathetic **User research** provided crucial qualitative data that led to a revolutionary shift in product usability and adoption within **{{EFFECT_SKILL}}**.',
  'Clear **Problem definition** facilitated cross-functional alignment by establishing an undisputed, shared target for the solution achieved by **{{EFFECT_SKILL}}**.',
  'Transparent **Reporting** established a cadence of trust with executive sponsors, securing continued funding and support for **{{EFFECT_SKILL}}**.',
  'In-depth **Competitive analysis** illuminated market gaps, positioning the effort for maximal differentiation and rapid scaling in **{{EFFECT_SKILL}}**.',
  'Optimized **Resource allocation** guaranteed zero waste in key expenditure areas, maximizing project budget runway for **{{EFFECT_SKILL}}**.',
  'The implementation of **Workflow automation** increased transactional throughput by 150%, accelerating the results of **{{EFFECT_SKILL}}**.',
  'Rigorous **Project scheduling** provided a reliable timeline, allowing dependent teams to plan their cycles with absolute certainty around **{{EFFECT_SKILL}}**.',
  'Compelling **Data visualization** converted complex datasets into actionable insights, driving immediate and effective course correction for **{{EFFECT_SKILL}}**.',
  'Expert **Logistics** ensured the seamless, just-in-time delivery of assets, avoiding costly downtime and ensuring the success of **{{EFFECT_SKILL}}**.',
  'Objective **Evaluation** of criteria led to the selection of the most stable and long-term viable technology stack, benefiting **{{EFFECT_SKILL}}**.',
  'A commitment to **Work quality** elevated the reputation of the final product, serving as a powerful, organic marketing tool for **{{EFFECT_SKILL}}**.',
  'Consistent **Objectivity** ensured all dissenting opinions were fairly weighed, leading to a balanced and robust final outcome for **{{EFFECT_SKILL}}**.',
  'Exceptional **Attention to detail** neutralized regulatory compliance risks before they materialized, ensuring the legal safety of **{{EFFECT_SKILL}}**.',
  'Structured **Reflection** provided an invaluable post-mortem, codifying lessons learned for the entire organizational process of **{{EFFECT_SKILL}}**.',
  'Decisive **Technical issue resolution** ensured system downtime was minimized, protecting business continuity and revenue streams associated with **{{EFFECT_SKILL}}**.',
  'Flawless **Go-live management** orchestrated a complex deployment, leading to a successful and celebrated organizational change in **{{EFFECT_SKILL}}**.',
  'Comprehensive **Business process mapping** identified unnecessary procedural steps, eliminating bureaucratic drag from the pursuit of **{{EFFECT_SKILL}}**.',
  'The pursuit of **Process improvement** created a continuous feedback loop, ensuring the operations related to **{{EFFECT_SKILL}}** were always state-of-the-art.',
  'Robust **Infrastructure management** provided the stable, scalable foundation necessary for sustained hyper-growth across all dimensions of **{{EFFECT_SKILL}}**.',
  'Skilled **Negotiation** secured favorable vendor contracts, reducing operational costs while improving service delivery for **{{EFFECT_SKILL}}**.',
  'Innovative **Marketing campaign management** created a viral event, generating buzz far beyond initial paid outreach and bolstering **{{EFFECT_SKILL}}**.',
  'Transparent **Stakeholder communication** proactively managed expectations, resulting in zero surprises and high satisfaction scores for **{{EFFECT_SKILL}}**.',
  'Strategic **Content management** ensured brand messaging was unified across all channels, reinforcing market identity and enabling **{{EFFECT_SKILL}}**.',
  'High-impact **Copywriting** converted passive interest into active sales leads, dramatically improving funnel conversion rates for **{{EFFECT_SKILL}}**.',
  'Systematic **Troubleshooting** isolated root causes rapidly, preventing minor malfunctions from escalating and safeguarding **{{EFFECT_SKILL}}**.',
  'Precise **Diagnostics** offered a predictive model for failure, allowing for replacement before operational disruption and enhancing **{{EFFECT_SKILL}}**.',
  'Effective **Preventive maintenance** extended equipment life, reducing CapEx spending and unexpected downtime for the execution of **{{EFFECT_SKILL}}**.',
  'Thorough **Documentation** served as the institutional memory, enabling new hires to reach full productivity in half the time on tasks related to **{{EFFECT_SKILL}}**.',
  'Efficient **Office management** optimized the physical environment, contributing directly to increased employee well-being and productivity related to **{{EFFECT_SKILL}}**.',
  'Taking **Accountability** restored trust after an error, rapidly closing the issue and rebuilding team credibility for **{{EFFECT_SKILL}}**.',
  'High-quality **Interpersonal communication** fostered an environment where novel ideas were safely shared and built upon, benefiting **{{EFFECT_SKILL}}**.',
  'Profound **Empathy** allowed for tailored solutions that addressed the true, unstated needs of the end-user population targeted by **{{EFFECT_SKILL}}**.',
  'The principle of **Open-mindedness** prevented confirmation bias, ensuring the final decision was based on objective reality when pursuing **{{EFFECT_SKILL}}**.',
  'Genuine **Humility** empowered team members at every level to challenge assumptions, leading to the discovery of core truth and aiding **{{EFFECT_SKILL}}**.',
];

const RECEIVE_MESSAGES = [
  'The acceptance of feedback surrounding **Problem identification** (D) allowed for immediate re-calibration, preventing costly strategic missteps that could have impacted **{{EFFECT_SKILL}}**.',
  'By actively soliciting data on **Curiosity** (I) , the team continuously broadened its understanding and maintained a critical, evolving perspective crucial for **{{EFFECT_SKILL}}**.',
  'Dedication to receiving candid input on **Active listening** (S) maximized informational accuracy and strengthened inter-departmental trust during the execution of **{{EFFECT_SKILL}}**.',
  'Openness to external critiques of **Critical thinking** (C) sharpened the analysis, transforming initial assumptions into verifiable facts that underpinned **{{EFFECT_SKILL}}**.',
  'Incorporating external perspectives on **Strategic thinking** (W) mitigated future risks and diversified growth opportunities associated with **{{EFFECT_SKILL}}**.',
  'Receiving metrics on **Adaptability** (D) quickly highlighted structural rigidities, prompting vital process modifications necessary for **{{EFFECT_SKILL}}**.',
  'Continuous input regarding the effectiveness of **Creativity** (I) helped balance innovation with practical implementation constraints inherent in **{{EFFECT_SKILL}}**.',
  'Feedback on **Collaboration** (S) quality streamlined team interactions, defining clear roles and reducing redundant effort within **{{EFFECT_SKILL}}**.',
  'Acknowledging results related to **Persistence** (C) allowed leadership to correctly calibrate the resources needed for future high-difficulty tasks in **{{EFFECT_SKILL}}**.',
  'Accepting guidance on effective **Storytelling** (W) optimized messaging for diverse audiences, ensuring emotional resonance and recall vital for **{{EFFECT_SKILL}}**.',
  'The ability to process data on **Decision-making** (D) speed and accuracy led to enhanced executive calibration and reduced analytical paralysis in **{{EFFECT_SKILL}}**.',
  'Actively seeking input on **Resourcefulness** (I) uncovered hidden opportunities for utilizing existing overlooked assets, enhancing the feasibility of **{{EFFECT_SKILL}}**.',
  'Soliciting external checks on **Prioritization** (S) ensured market demands were correctly weighed against internal capacity to achieve **{{EFFECT_SKILL}}**.',
  'Regular audits of **Organizational skills** (C) maintained systematic efficiency even as the company scaled rapidly to support **{{EFFECT_SKILL}}**.',
  'External review of **Goal-setting** (W) validated the long-term vision, securing commitment from investors and partners crucial for **{{EFFECT_SKILL}}**.',
  'Receiving counter-evidence on **Hypothesis-driven solution discovery** (D) saved weeks of effort on paths proven non-viable, accelerating the achievement of **{{EFFECT_SKILL}}**.',
  'The willingness to absorb data from **User research** (I) fostered a truly customer-centric product development cycle, perfecting the outcome of **{{EFFECT_SKILL}}**.',
  'Candid review of **Problem definition** (S) ensured the team was solving the right challenge, rather than merely treating symptoms, leading to true success in **{{EFFECT_SKILL}}**.',
  'Processing critiques of **Reporting** (C) clarity made complex updates accessible to all levels of the organization, ensuring transparent progress in **{{EFFECT_SKILL}}**.',
  'Deep ingestion of data from **Competitive analysis** (W) provided early warnings regarding emerging market threats, protecting the value of **{{EFFECT_SKILL}}**.',
  'Receptivity to audits of **Resource allocation** (D) optimized capital expenditure and lowered operational leverage risk associated with **{{EFFECT_SKILL}}**.',
  'By incorporating team input on **Workflow automation** (I) , the system was optimized for human-machine interaction, reducing errors and perfecting **{{EFFECT_SKILL}}**.',
  'Adjusting based on feedback on **Project scheduling** (S) successfully managed scope creep and prevented deadline slippage during the pursuit of **{{EFFECT_SKILL}}**.',
  'Reviewing consumption metrics for **Data visualization** (C) led to simplified dashboards that boosted decision speed and improved clarity for **{{EFFECT_SKILL}}**.',
  'Adopting feedback on **Logistics** (W) execution minimized lead times and maximized supply chain reliability for assets supporting **{{EFFECT_SKILL}}**.',
  'Integrating peer review into the **Evaluation** (D) process ensured fairness and comprehensive coverage of all legal precedents relevant to **{{EFFECT_SKILL}}**.',
  'Critiques concerning **Work quality** (I) fostered a continuous improvement mindset, raising the internal bar for excellence and the final value of **{{EFFECT_SKILL}}**.',
  'The commitment to receiving feedback on **Objectivity** (S) protected the integrity of the review process against internal bias, ensuring the legal foundation of **{{EFFECT_SKILL}}**.',
  'A culture of receiving detail-oriented checks on **Attention to detail** (C) created a zero-defect rate on essential documents for **{{EFFECT_SKILL}}**.',
  'Structured feedback mechanisms for **Reflection** (W) turned every project completion into a codified learning event for the whole firm, benefiting future **{{EFFECT_SKILL}}**.',
  'Input on the speed of **Technical issue resolution** (D) helped fine-tune the incident response protocol for maximum efficiency, minimizing downtime related to **{{EFFECT_SKILL}}**.',
  'Receiving post-deployment reviews of **Go-live management** (I) refined future release strategies, minimizing user friction during the implementation of **{{EFFECT_SKILL}}**.',
  'Adjusting based on feedback on **Business process mapping** (S) ensured the digital workflow accurately mirrored user needs, enhancing the success of **{{EFFECT_SKILL}}**.',
  'The implementation of suggestions on **Process improvement** (C) created quantifiable gains in efficiency year-over-year, improving the delivery of **{{EFFECT_SKILL}}**.',
  'By acting on alerts and monitoring of **Infrastructure management** (W) , capacity planning became predictive and cost-effective, supporting **{{EFFECT_SKILL}}**.',
  'Processing external data on **Negotiation** (D) outcomes strengthened future contract talks and protected long-term interests related to **{{EFFECT_SKILL}}**.',
  'Feedback on **Marketing campaign management** (I) effectiveness led to rapid A/B testing and optimization of channel spend, maximizing the impact of **{{EFFECT_SKILL}}**.',
  'Soliciting input on **Stakeholder communication** (S) ensured all key parties felt heard and valued throughout the cycle of **{{EFFECT_SKILL}}**.',
  'Continuous review of **Content management** (C) practices ensured digital assets were always fresh, relevant, and compliant, supporting the goals of **{{EFFECT_SKILL}}**.',
  'Iteratively testing **Copywriting** (W) variants provided clear data on which messaging delivered the highest conversion rate for **{{EFFECT_SKILL}}**.',
  'The use of peer review in **Troubleshooting** (D) ensured no obvious solutions were missed during complex diagnostic processes, enhancing the reliability of **{{EFFECT_SKILL}}**.',
  'Integrating field reports into **Diagnostics** (I) provided real-world data that enhanced the accuracy of maintenance forecasts for the components of **{{EFFECT_SKILL}}**.',
  'Feedback on **Preventive maintenance** (S) scheduling allowed for perfect alignment with low-demand operational windows, boosting the efficiency of **{{EFFECT_SKILL}}**.',
  'Regularly auditing **Documentation** (C) quality ensured training materials remained current and accessible to the team working on **{{EFFECT_SKILL}}**.',
  'Input regarding **Office management** (W) needs created a workspace that actively supported varied work styles and team size for personnel focused on **{{EFFECT_SKILL}}**.',
  'The structure for receiving critique on **Accountability** (D) ensured that performance gaps were addressed openly and quickly, promoting trust within **{{EFFECT_SKILL}}**.',
  'Reviewing success metrics for **Interpersonal communication** (I) improved internal team synergy and reduced project friction, leading to a smoother **{{EFFECT_SKILL}}**.',
  'Seeking data on the impact of **Empathy** (S) helped the organization measure and institutionalize compassionate service delivery, enhancing the soft skills vital for **{{EFFECT_SKILL}}**.',
  'Implementing mechanisms to receive new perspectives on **Open-mindedness** (C) drove continuous internal intellectual refreshment, benefiting the critical analysis within **{{EFFECT_SKILL}}**.',
  'A system to reward input challenging internal biases related to **Humility** (W) fostered a truly objective decision-making culture, strengthening the ethics of **{{EFFECT_SKILL}}**.',
];

const axisLabels = [];
const rowMessages = [];

// Part 1: Skills (Give) - i=0 to 49
coreSkills.forEach((skill, index) => {
  axisLabels.push(`${skill.name} (Give)`);
  rowMessages.push(GIVE_MESSAGES[index]);
});

// Part 2: Skills (Receive) - i=50 to 99
coreSkills.forEach((skill, index) => {
  axisLabels.push(`${skill.name} (Receive)`);
  rowMessages.push(RECEIVE_MESSAGES[index]);
});

const MATRIX_SIZE = 100;
const causeEffectMatrix = [];

for (let i = 0; i < MATRIX_SIZE; i++) {
  const row = [];
  const messageTemplate = rowMessages[i];
  for (let j = 0; j < MATRIX_SIZE; j++) {
    const effectSkillLabel = axisLabels[j];
    // Substitute the placeholder with the column's skill label
    const finalMessage = messageTemplate.replace('{{EFFECT_SKILL}}', effectSkillLabel);
    row.push(finalMessage);
  }
  causeEffectMatrix.push(row);
}

const MATRIX_DATA = {
  matrix: causeEffectMatrix,
  labels: axisLabels,
  rowMessages: rowMessages,
};

// Console output for easy visualization/testing
console.log(`--- 100x100 Matrix Summary ---`);
console.log(`Matrix Size: ${MATRIX_DATA.matrix.length}x${MATRIX_DATA.matrix[0].length}`);
console.log(`Total Unique Templates: ${new Set(MATRIX_DATA.rowMessages).size}`);
console.log(`Total Axis Labels: ${MATRIX_DATA.labels.length}`);
console.log(`\nExample Cell (0, 0) - Cause: ${MATRIX_DATA.labels[0]} | Effect: ${MATRIX_DATA.labels[0]}`);
console.log(`Message: ${MATRIX_DATA.matrix[0][0]}`);
console.log(`\nExample Cell (55, 10) - Cause: ${MATRIX_DATA.labels[55]} | Effect: ${MATRIX_DATA.labels[10]}`);
console.log(`Message: ${MATRIX_DATA.matrix[55][10]}`);

// The structure can be accessed via the global variable MATRIX_DATA if run in a browser environment.