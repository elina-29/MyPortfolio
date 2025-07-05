 // Disable browser's scroll restoration to prevent it from remembering previous scroll position
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Immediately scroll to the top of the page when the page loads
window.addEventListener('load', function() {
    // First, scroll instantly to the top
    window.scrollTo(0, 0);
    
    // Then after a short delay, scroll smoothly to the top again to ensure
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 50);
});

// Also scroll to top when the DOM is fully loaded, as an extra precaution
document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
});

        // Immediately scroll to the top of the page as soon as the script runs
        // window.scrollTo(0, 0);

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
// Remove any hash from the URL when the page loads
window.addEventListener('load', function() {
    if (window.location.hash) {
        history.replaceState(null, null, ' ');
    }
});
        // Binary Rain Effect
        const binaryRainContainer = document.querySelector('.binary-rain-container');
        const numColumns = Math.floor(window.innerWidth / 20); // Adjust column density
        const characters = '01'; // Binary characters

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('binary-column');
            column.style.left = `${Math.random() * 100}vw`;
            column.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10 seconds
            column.style.animationDelay = `${Math.random() * -10}s`; // Stagger start times

            let text = '';
            for (let j = 0; j < 50; j++) { // Length of the binary string
                text += characters[Math.floor(Math.random() * characters.length)];
                if (j % 5 === 0 && j !== 0) text += '\n'; // Add newlines for flow
            }
            column.textContent = text;
            binaryRainContainer.appendChild(column);
        }

        // Typing Effect for Landing Page
        const typingElement = document.querySelector('.typing-effect');
        const textToType = typingElement.textContent;
        typingElement.textContent = ''; // Clear initial text
        let charIndex = 0;

        function typeText() {
            if (charIndex < textToType.length) {
                typingElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 70); // Typing speed
            }
        }
        typeText(); // Start typing effect

        // D3.js Directed Graph for Skills
        const svg = d3.select("#skills-graph");
        const width = svg.node().getBoundingClientRect().width;
        const height = svg.node().getBoundingClientRect().height;

        // Define arrowhead marker
        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 15) // Position of the arrow relative to the end of the line
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0, -5 L 10, 0 L 0, 5")
            .attr("fill", "#39ff14")
            .style("stroke", "none");

        const nodesData = [
            // Languages
            { id: "Python", group: 1, type: "Language", description: "Used for scripting, security automation, and data extraction." },
            { id: "Java", group: 1, type: "Language", description: "Strong foundation in object-oriented programming and backend logic." },
            { id: "JavaScript", group: 1, type: "Language", description: "Essential for understanding client-side web attacks and behavior." },
            { id: "HTML", group: 1, type: "Language", description: "Markup language for web content — important in phishing analysis." },
            { id: "CSS", group: 1, type: "Language", description: "Used to understand layout manipulations and visual attack surfaces." },

            // Concepts
            { id: "Web Security", group: 2, type: "Concept", description: "Securing web applications through secure coding and testing." },
            { id: "OWASP Top 10", group: 2, type: "Concept", description: "Top 10 critical web application security risks." },
            { id: "Cryptography", group: 2, type: "Concept", description: "Encryption, hashing, and secure transmission of data." },
            { id: "Threat Intel", group: 2, type: "Concept", description: "Understanding threat actors, tactics, and indicators of compromise." },
            { id: "Cloud Security", group: 2, type: "Concept", description: "Ensuring secure deployment and auditing of cloud environments." },
            { id: "Malware Analysis", group: 2, type: "Concept", description: "Behavioral and static analysis of malicious code." },
            { id: "Networking", group: 2, type: "Concept", description: "TCP/IP, DNS, ports, protocols, and traffic inspection." },
            { id: "Vulnerability Assessment", group: 2, type: "Concept", description: "Identifying, analyzing, and reporting system vulnerabilities." },
            { id: "CVE Analysis", group: 2, type: "Concept", description: "Reviewing known vulnerabilities from CVE databases." },

            // Tools
            { id: "Burp Suite", group: 3, type: "Tool", description: "Web application security testing tool." },
            { id: "Nmap", group: 3, type: "Tool", description: "Network mapper for host discovery and port scanning." },
            { id: "Wireshark", group: 3, type: "Tool", description: "Packet analyzer for network traffic inspection." },
            { id: "Nessus", group: 3, type: "Tool", description: "Network and system vulnerability scanner." },
            { id: "Mend", group: 3, type: "Tool", description: "Open-source dependency vulnerability scanner." },
            { id: "Fortify", group: 3, type: "Tool", description: "Static Application Security Testing (SAST) tool for secure code review." },
            { id: "ScoutSuite", group: 3, type: "Tool", description: "Cloud security auditing tool for AWS, Azure, and GCP." },
            { id: "VirusTotal API", group: 3, type: "Tool", description: "Checks URLs/files against antivirus engines and threat intel." }
        ];



        const linksData = [
            // Languages to Concepts
            { source: "Python", target: "Web Security" },
            { source: "Python", target: "Malware Analysis" },
            { source: "Python", target: "Threat Intel" },
            { source: "Python", target: "CVE Analysis" },
            { source: "Python", target: "Vulnerability Assessment" },

            { source: "Java", target: "Web Security" },
            { source: "Java", target: "Fortify" },

            { source: "JavaScript", target: "Web Security" },
            { source: "JavaScript", target: "Burp Suite" },

            { source: "HTML", target: "Web Security" },
            { source: "CSS", target: "Web Security" },

            // Concepts to Concepts
            { source: "Web Security", target: "OWASP Top 10" },
            { source: "OWASP Top 10", target: "Vulnerability Assessment" },
            { source: "Vulnerability Assessment", target: "CVE Analysis" },
            { source: "Networking", target: "Web Security" },
            { source: "Threat Intel", target: "Malware Analysis" },
            { source: "Cryptography", target: "Web Security" },
            { source: "Web Security", target: "Cloud Security" },

            // Tools to Concepts
            { source: "Burp Suite", target: "Web Security" },
            { source: "Wireshark", target: "Networking" },
            { source: "Nmap", target: "Networking" },
            { source: "Nessus", target: "Vulnerability Assessment" },
            { source: "Mend", target: "CVE Analysis" },
            { source: "Fortify", target: "Web Security" },
            { source: "ScoutSuite", target: "Cloud Security" },
            { source: "VirusTotal API", target: "Threat Intel" }
        ];



        // Create a force simulation
        const simulation = d3.forceSimulation(nodesData)
            .force("link", d3.forceLink(linksData).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collide", d3.forceCollide(20)); // Prevent nodes from overlapping

        // Draw links
        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(linksData)
            .enter().append("line")
            .attr("class", "link")
            .attr("marker-end", "url(#arrowhead)"); // Attach arrowhead

        // Draw nodes
        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(nodesData)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("circle")
            .attr("r", 10)
            .attr("fill", d => {
                // Color nodes based on group (type)
                if (d.type === "Language") return "#58a6ff"; // Blue for languages
                if (d.type === "Concept") return "#ff00ff"; // Magenta for concepts
                if (d.type === "Tool") return "#39ff14"; // Green for tools
                return "#c9d1d9"; // Default
            })
            .attr("stroke", d => {
                if (d.type === "Language") return "#00f0ff";
                if (d.type === "Concept") return "#ffa500";
                if (d.type === "Tool") return "#00ff00";
                return "#c9d1d9";
            })
            .attr("stroke-width", 2);

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id);

        // Tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("background-color", "#161b22")
            .style("border", "1px solid #39ff14")
            .style("padding", "8px")
            .style("border-radius", "5px")
            .style("color", "#c9d1d9")
            .style("font-family", "'Space Mono', monospace")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("z-index", 1000);

        node.on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(`<strong>${d.id}</strong> (${d.type})<br>${d.description}`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });


        // Update positions on each tick
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
        });

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        // Terminal Interaction
        const terminalInput = document.getElementById('terminal-input');
        const terminalOutput = document.getElementById('terminal-output');

        const commands = {
            help: `
                <div class="text-neon-green">Available commands:</div>
                <div><span class="text-neon-blue">help</span> - Displays this help message.</div>
                <div><span class="text-neon-blue">whoami</span> - Learn about the architect.</div>
                <div><span class="text-neon-blue">email</span> - Get my email address.</div>
                <div><span class="text-neon-blue">linkedin</span> - Visit my LinkedIn profile.</div>
                <div><span class="text-neon-blue">github</span> - Check out my GitHub repositories.</div>
                <div><span class="text-neon-blue">clear</span> - Clears the terminal output.</div>
                <div><span class="text-neon-blue">contact &lt;message&gt;</span> - Send a simulated message.</div>
            `,
            whoami: `
                <div class="text-neon-green">Initializing identity protocol...</div>
                <div><span class="text-neon-blue">Name:</span> Pakhi Sarkar</div>
                <div><span class="text-neon-blue">Role:</span> Associate SDET- Vulnerability Management</div>
                <div><span class="text-neon-blue">Mission:</span> Fortifying digital landscapes against evolving threats.</div>
            `,
            email: `
                <div class="text-neon-green">Establishing secure channel for email...</div>
                <div><span class="text-neon-blue">Email:</span> <a href="mailto:pakhi17sarkar@gmail.com" class="text-neon-green hover:underline">pakhi17sarkar@gmail.com</a></div>
            `,
            linkedin: `
                <div class="text-neon-green">Redirecting to LinkedIn profile...</div>
                <div><span class="text-neon-blue">LinkedIn:</span> <a href="https://www.linkedin.com/PakhiSarkar" target="_blank" class="text-neon-green hover:underline">linkedin.com/in/Pakhi Sarkar</a></div>
            `,
            github: `
                <div class="text-neon-green">Accessing GitHub repositories...</div>
                <div><span class="text-neon-blue">GitHub:</span> <a href="https://github.com/elina-29" target="_blank" class="text-neon-green hover:underline">github.com/yourusername</a></div>
            `,
            clear: '' // Handled by function
        };

        terminalInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                const command = terminalInput.value.trim();
                appendOutput(`<span class="text-neon-blue">guest@portfolio</span>:<span class="text-purple-400">~</span>$ ${command}`);
                processCommand(command);
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight; // Scroll to bottom
            }
        });

        function appendOutput(message) {
            const div = document.createElement('div');
            div.innerHTML = message;
            terminalOutput.appendChild(div);
        }

        function processCommand(command) {
            const parts = command.split(' ');
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            if (cmd === 'clear') {
                terminalOutput.innerHTML = ''; // Clear all output
                appendOutput(`<span class="text-neon-blue">guest@portfolio</span>:<span class="text-purple-400">~</span>$ Welcome to the secure communication channel. Type 'help' for commands.`);
            } else if (commands[cmd]) {
                appendOutput(commands[cmd]);
            } else if (cmd === 'contact') {
                if (args) {
                    appendOutput(`<div class="text-neon-green">Message received: "${args}". I will review this transmission.</div>`);
                    appendOutput(`<div class="text-gray-400">Note: This is a simulated message. For actual contact, please use the provided email.</div>`);
                } else {
                    appendOutput(`<div class="text-red-500">Error: Please provide a message. Usage: contact &lt;your message&gt;</div>`);
                }
            } else {
                appendOutput(`<div class="text-red-500">Error: Command not found. Type 'help' for a list of commands.</div>`);
            }
        }

        // Removed the window.onload scroll to landing.
        // Instead, we will use scroll restoration and immediate scroll to top.
