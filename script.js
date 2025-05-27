window.addEventListener("DOMContentLoaded", function () {
  fetch("https://script.google.com/macros/s/AKfycbwKkrN-9bpai3yCdioTu6xYtD7tQ22yCuFQThNCyeP9rNzGnjrYjuk1uGFtoxAqpQg/exec")
    .then(response => response.json())
    .then(data => {
      const anoSelect = document.getElementById("ano");
      const mesSelect = document.getElementById("mes");

      anoSelect.innerHTML = "<option value=''>Todos</option>";
      mesSelect.innerHTML = "<option value=''>Todos</option>";

      data.anos.forEach(ano => {
        anoSelect.innerHTML += `<option value="${ano}">${ano}</option>`;
      });

      data.meses.forEach(mes => {
        mesSelect.innerHTML += `<option value="${mes}">${mes}</option>`;
      });
    });
});

document.getElementById("exportForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ano = document.getElementById("ano").value;
  const mes = document.getElementById("mes").value;
  const secretaria = document.getElementById("secretaria").value;
  const empenho = document.getElementById("empenho").value;
  const processo = document.getElementById("processo").value;
  const credor = document.getElementById("credor").value;

  const params = new URLSearchParams({
    ano,
    mes,
    secretaria,
    empenho,
    processo,
    credor
  });

  const mensagem = document.getElementById("mensagem");
  mensagem.innerText = "Processando...";

  fetch("https://script.google.com/macros/s/AKfycbwKkrN-9bpai3yCdioTu6xYtD7tQ22yCuFQThNCyeP9rNzGnjrYjuk1uGFtoxAqpQg/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        mensagem.innerText = "Dados filtrados com sucesso!";
      } else {
        mensagem.innerText = "Erro ao processar os dados.";
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      mensagem.innerText = "Erro de conexão com o servidor.";
    });
});

document.getElementById("btnExportar").addEventListener("click", function () {
  window.open("https://docs.google.com/spreadsheets/d/1lqKdfefhDCYTvVl2pxHJk0F3TYSqWPbQwvFdxhYZxQ0/export?format=csv&gid=325491086", "_blank");
});
