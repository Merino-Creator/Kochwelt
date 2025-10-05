document.addEventListener('DOMContentLoaded', function() {
  const basePeople = Number(document.getElementById('calculator').dataset.basePeople || 1);
  const input = document.getElementById('peopleCount');
  const btn = document.getElementById('calcBtn');
  const amounts = Array.from(document.querySelectorAll('.amount'));

  // Originalwerte einmalig merken
  const baseValues = amounts.map(function(span) {
    return {
      el: span,
      amount: Number(span.dataset.amount),
      unit: span.dataset.unit || ''
    };
  });

  function formatAmount(value, unit) {
    // Rundungslogik je Einheit (einfach & praxisnah)
    if (unit === 'g' || unit === 'ml') {
      return Math.round(value).toLocaleString('de-DE');
    }
    if (unit === 'TL' || unit === 'EL') {
      return (Math.round(value * 10) / 10).toLocaleString('de-DE'); // 1 Nachkommastelle
    }
    if (unit === 'Prise') {
      const v = Math.max(1, Math.round(value)); // mind. 1 Prise
      return v.toLocaleString('de-DE');
    }
    // Fallback
    return (Math.round(value * 10) / 10).toLocaleString('de-DE');
  }

  function applyScaling() {
    const people = Number(input.value || basePeople);
    const factor = people / basePeople;

    baseValues.forEach(function({ el, amount, unit }) {
      const scaled = amount * factor;
      el.textContent = `${formatAmount(scaled, unit)}${unit ? ' ' + unit : ''}`;
    });
  }

  // Button klick & Enter im Input
  btn.addEventListener('click', applyScaling);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') applyScaling();
  });

  // Optional: beim Laden auf den Placeholder setzen
  input.value = basePeople;
});
