  function hoverCard(card) {
    card.style.transform = 'translateY(-10px)';  /* Mova o card para cima */
    card.style.transition = 'transform 0.3s ease-out';  /* Adicione uma transição suave */
    card.style.backgroundColor = '#FFA07A	';  /* Altere a cor de fundo quando o mouse está sobre o card */
  }

  function unhoverCard(card) {
    card.style.transform = 'translateY(0)';  /* Restaure a posição original do card */
    card.style.transition = 'transform 0.3s ease-out';  /* Adicione uma transição suave */
    card.style.backgroundColor = '#fff';  /* Restaure a cor de fundo original quando o mouse sai do card */
  }