/**
 * Contact Component
 * Renders contact form as a CLI input interface
 */

export function initContact() {
  const container = document.getElementById('contact-form');
  if (!container) return;

  container.innerHTML = `
    <div class="cli-contact glass-card">
      <div class="cli-output" id="cli-output">
        <div class="cli-line">Welcome to SalyVn Mail Client v1.0</div>
        <div class="cli-line">Type your message below.</div>
      </div>
      
      <form id="contact-form" class="cli-form">
        <div class="input-group">
            <span class="prompt">user@email:~$</span>
            <input type="email" id="email" placeholder="Enter your email" required autocomplete="off">
        </div>
        <div class="input-group">
            <span class="prompt">user@message:~$</span>
            <input type="text" id="message" placeholder="Type message..." required autocomplete="off">
        </div>
        <div class="cli-actions">
            <button type="submit" class="btn-cli">SEND_PACKET</button>
        </div>
      </form>
    </div>
  `;

  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const output = document.getElementById('cli-output');
    const email = document.getElementById('email').value;

    // Simulate sending
    output.innerHTML += `<div class="cli-line">> Sending packet to SalyVn...</div>`;

    setTimeout(() => {
      output.innerHTML += `<div class="cli-line success">> PACKET SENT SUCCESSFULLY [200 OK]</div>`;
      form.reset();
    }, 1500);
  });
}
