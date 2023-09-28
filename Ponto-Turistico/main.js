  function hoverCard(card) {
    card.style.transform = 'translateY(-10px)'; 
    card.style.transition = 'transform 0.3s ease-out'; 
    card.style.backgroundColor = '#FFA07A	';  
  }

  function unhoverCard(card) {
    card.style.transform = 'translateY(0)';  
    card.style.transition = 'transform 0.3s ease-out'; 
  }