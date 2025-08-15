(() => {
  // 📌 Referencias DOM
  const d = document,
    btnCarta = d.querySelector("#btnCarta"),
    btnIniciarJuego = d.querySelector("#btnIniciarJuego"),
    imgCarta = d.querySelector("#imgCarta"),
    historial = d.querySelector("#historialCartas"),
    nombreCarta = d.querySelector("#nombreCarta"),
    btnCopiarNombre = d.querySelector("#btnCopiarNombre"),
    cartasRecientes = d.querySelector("#cartasRecientes");

  // 🃏 Base de datos de cartas
  const dbCartas = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54"
  ];
    const nombresCartas = {
  "1": "Acura",
  "2": "Alfa Romeo",
  "3": "Aston Martin",
  "4": "Audi",
  "5": "Bentley",
  "6": "BMW",
  "7": "Bugatti",
  "8": "Buick",
  "9": "Cadillac",
  "10": "Chevrolet",
  "11": "Chrysler",
  "12": "Citroen",
  "13": "Cupra",
  "14": "Dodge",
  "15": "Ferrari",
  "16": "Fiat",
  "17": "Ford",
  "18": "GMC",
  "19": "Honda",
  "20": "Hummer",
  "21": "Hyundai",
  "22": "Infiniti",
  "23": "Isuzu",
  "24": "Jaguar",
  "25": "Jeep",
  "26": "KIA",
  "27": "Lamborghini",
  "28": "Land Rover",
  "29": "Lexus",
  "30": "Lincoln",
  "31": "Lotus",
  "32": "Maserati",
  "33": "Mazda",
  "34": "Mercedes Benz",
  "35": "Mercury",
  "36": "Mini",
  "37": "Mitsubishi",
  "38": "Nissan",
  "39": "Opel",
  "40": "Pagani",
  "41": "Peugeot",
  "42": "Pontiac",
  "43": "Porsche",
  "44": "RAM",
  "45": "Renault",
  "46": "Rolls Royce",
  "47": "Seat",
  "48": "Shelby",
  "49": "Smart",
  "50": "Subaru",
  "51": "Suzuki",
  "52": "Tesla",
  "53": "Toyota",
  "54": "Volkswagen"
};

  // 🎴 Estado del juego
  let cartas = [];
  let cartasMostradas = [];

  // 🔄 Barajar cartas
  const barajarCartas = () => {
    cartasMostradas = [];
    cartas = _.shuffle([...dbCartas]);
    renderHistorial();
    nombreCarta.textContent = "Nombre de la carta";
    imgCarta.src = "assets/cartas/carta.png";
    cartasRecientes.innerHTML = "";
    return cartas;
  };

  // 🃏 Pedir una carta
  const pedirCarta = () => cartas.pop();

  // 🎨 Renderizar historial visual
  const renderHistorial = () => {
    historial.innerHTML = "";
    dbCartas.forEach(carta => {
      const img = d.createElement("img");
      img.src = `./assets/cartas/${carta}.png`;
      img.classList.add("historial-img");
      if (cartasMostradas.includes(carta)) {
        img.classList.add("gris");
      }
      historial.appendChild(img);
    });
  };

  // 🖼️ Mostrar cartas recientes debajo de la principal
  const renderCartasRecientes = () => {
    const ultimas = cartasMostradas.slice(-3).reverse();
    cartasRecientes.innerHTML = "";
    ultimas.forEach(carta => {
      const img = d.createElement("img");
      img.src = `./assets/cartas/${carta}.png`;
      img.alt = nombresCartas[carta] || `Carta ${carta}`;
      img.title = nombresCartas[carta] || `Carta ${carta}`;
      cartasRecientes.appendChild(img);
    });
  };

  // ▶️ Iniciar juego
  btnIniciarJuego.addEventListener("click", () => {
    barajarCartas();
    btnCarta.disabled = false;
  });

  // 🖱️ Seleccionar carta
  btnCarta.addEventListener("click", () => {
    if (cartas.length === 0) {
      console.warn("Se acabaron las cartas");
      btnCarta.disabled = true;
      return;
    }

    const carta = pedirCarta();
    cartasMostradas.push(carta);
    imgCarta.src = `./assets/cartas/${carta}.png`;
    nombreCarta.textContent = nombresCartas[carta] || `Carta ${carta}`;
    renderHistorial();
    renderCartasRecientes();
  });

  // 📋 Copiar nombre de la carta
  btnCopiarNombre.addEventListener("click", () => {
    const nombre = nombreCarta.textContent.trim();
    const textoFormateado = `**<<${nombre}>>**`;

    navigator.clipboard.writeText(textoFormateado)
      .then(() => {
        btnCopiarNombre.textContent = "¡Copiado!";
        nombreCarta.classList.add("copiado");

        const nombre = nombreCarta.textContent.trim();
        
        setTimeout(() => {
          btnCopiarNombre.textContent = "Copiar";
          nombreCarta.classList.remove("copiado");
        }, 1500);
      })
      .catch(err => console.error("Error al copiar", err));
  });
})();