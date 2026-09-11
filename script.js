 const partyDateTime = new Date("2026-12-12T11:00:00");

  function updateCountdown(){
    const now = new Date();
    let diff = partyDateTime - now;
    const els = {
      d: document.getElementById('cd-days'),
      h: document.getElementById('cd-hours'),
      m: document.getElementById('cd-mins'),
      s: document.getElementById('cd-secs')
    };
    if (diff <= 0) {
      els.d.textContent = '0'; els.h.textContent = '0';
      els.m.textContent = '0'; els.s.textContent = '0';
      document.querySelector('.countdown').insertAdjacentHTML('afterend',
        '<p style="text-align:center;font-weight:800;color:#E8434B;margin-top:6px;">The mission is underway! 🎉</p>');
      clearInterval(timer);
      return;
    }
    const day = Math.floor(diff / (1000*60*60*24));
    diff -= day * (1000*60*60*24);
    const hr = Math.floor(diff / (1000*60*60));
    diff -= hr * (1000*60*60);
    const min = Math.floor(diff / (1000*60));
    diff -= min * (1000*60);
    const sec = Math.floor(diff / 1000);

    els.d.textContent = day;
    els.h.textContent = hr;
    els.m.textContent = min;
    els.s.textContent = sec;
  }
  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);

 
  const rsvpEmail = "rsvp@example.com";

  const overlay = document.getElementById('rsvpOverlay');
  const openBtn = document.getElementById('openRsvp');
  const closeBtn = document.getElementById('closeRsvp');
  const form = document.getElementById('rsvpForm');
  const successView = document.getElementById('rsvpSuccess');
  const successMsg = document.getElementById('rsvpSuccessMsg');

  function openModal(){
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    form.hidden = false;
    successView.hidden = true;
    form.reset();
    document.getElementById('guestName').focus();
  }
  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('guestName').value.trim();
    const attending = form.querySelector('input[name="attending"]:checked').value;
    const count = document.getElementById('guestCount').value;
    const notes = document.getElementById('guestNotes').value.trim();

   
    const subject = encodeURIComponent(`RSVP: ${name} — ${attending === 'Yes' ? 'Attending' : 'Not attending'}`);
    const bodyLines = [
      `Name: ${name}`,
      `Attending: ${attending}`,
      `Number attending: ${count}`,
      `Notes: ${notes || '—'}`
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoLink = `mailto:${rsvpEmail}?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;

    successMsg.textContent = attending === 'Yes'
      ? `Thanks, ${name.split(' ')[0] || 'pup'} — we've noted you're joining the squad!`
      : `Thanks for letting us know, ${name.split(' ')[0] || 'friend'} — you'll be missed!`;
    form.hidden = true;
    successView.hidden = false;
  });

  
  
  const coverPage = document.getElementById('coverPage');
  const mainContent = document.getElementById('mainContent');

  document.documentElement.classList.add('locked');

  function openInvitation(){
    if (coverPage.classList.contains('closing')) return;
    coverPage.classList.add('closing');
    mainContent.classList.add('revealed');
    document.documentElement.classList.remove('locked');
    setTimeout(() => { coverPage.hidden = true; }, 750);
  }

  coverPage.addEventListener('click', openInvitation);
  coverPage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openInvitation();
    }
  });