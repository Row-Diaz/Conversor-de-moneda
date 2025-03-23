// Función para convertir monedas
async function convertirMoneda() {
  const inputCantidad = document.querySelector(".amount").value;
  const currencySelect = document.getElementById("currency");
  const selectedCurrency = currencySelect.value;
  const resultadoDiv = document.getElementById("resultado"); // Obtener el div de resultados

  try {
    const response = await fetch("https://mindicador.cl/api/");
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();

    const valorDolar = data.dolar.valor;
    const valorEuro = data.euro.valor;
    const valorPesoArgentino = valorDolar * 0.009; // Ajustar según el tipo de cambio real

    let resultado;
    switch (selectedCurrency) {
      case "dolar":
        resultado = inputCantidad / valorDolar;
        resultadoDiv.innerHTML = `<p>${resultado.toFixed(2)} USD</p>`;
        break;
      case "euros":
        resultado = inputCantidad / valorEuro;
        resultadoDiv.innerHTML = `<p>${resultado.toFixed(2)} EUR</p>`;
        break;
      default:
        resultadoDiv.innerHTML = `<p>Por favor seleccione una moneda válida.</p>`;
    }
  } catch (error) {
    resultadoDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Evento para manejar el clic en el botón de búsqueda
document.querySelector(".btnsearch").addEventListener("click", function () {
  convertirMoneda();
});
