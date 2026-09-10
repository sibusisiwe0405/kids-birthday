
 
  const partyDateTime = new Date("2026-09-12T11:00:00");

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
  
 async function submitRSVP() {
  console.log("Button clicked!");
    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fname || !lname || !email) {
        alert('Please fill in your name and email before sending.');
        return;
    }

    if (attending === "") {
        alert("Please let us know whether you'll be attending.");
        return;
    }
    

    const formData = new FormData();
formData.append("fname", fname);
formData.append("lname", lname);
formData.append("email", email);
formData.append("attending", attending);

try{
const response = await fetch("https://script.google.com/macros/s/AKfycbxw6HjbV_8Al_PmSQ1Ug0A9EKITYhd3F_HcDIGqfN7PtWIo5bM2w87CnqaXsElpH2lvYQ/exec", {
    method: "POST",
    body: formData
});

        const result = await response.json();

        if (result.success) {
            document.getElementById('rsvpForm').style.display = 'none';
            document.getElementById('successMsg').style.display = 'block';
        } else {
            alert(result.error);
            
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong." + error.message);
    }
}