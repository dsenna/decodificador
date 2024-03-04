document.addEventListener("DOMContentLoaded", function () {
	let textoOriginalTextarea = document.getElementById("texto-original");

	textoOriginalTextarea.addEventListener("input", function () {
		let textoAtual = textoOriginalTextarea.value;
		// Remove acentos e converte para minúsculas
		let textoNormalizado = textoAtual.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
		// Substitui caracteres que não são letras minúsculas
		let textoSemAcento = textoNormalizado.replace(/[^a-z]/g, "");
		// Define o valor do textarea como o texto sem acento
		textoOriginalTextarea.value = textoSemAcento;
	});

	let botaoCriptografar = document.getElementById("botao_criptografar");
	let botaoDescriptografar = document.getElementById("botao_descriptografar");
	let botaoCopia = document.getElementById("botao_copia");

	botaoCriptografar.addEventListener("click", function () {
		let textoTextarea = textoOriginalTextarea.value;
		if (textoTextarea.trim() !== '') {
			let textoCriptografado = criptografarTexto(textoTextarea);
			exibirTexto(textoCriptografado, "Texto criptografado");
			botaoCopia.style.display = "block"; // Torna o botão de cópia visível

			// Altera o estilo CSS do retângulo
			let retangulo = document.querySelector(".retangulo");
			if (retangulo) {
				retangulo.style.justifyContent = "space-between";
			}

			aumentarTamanhoFonte();
		} else {
			alert("Por favor, insira um texto para criptografar.");
		}
	});

	botaoDescriptografar.addEventListener("click", function () {
		let textoTextarea = textoOriginalTextarea.value;
		if (textoTextarea.trim() !== '') {
			let textoDescriptografado = descriptografarTexto(textoTextarea);
			exibirTexto(textoDescriptografado, "Texto descriptografado");
			botaoCopia.style.display = "block"; // Torna o botão de cópia visível

			// Altera o estilo CSS do retângulo
			let retangulo = document.querySelector(".retangulo");
			if (retangulo) {
				retangulo.style.justifyContent = "space-between";
			}

			aumentarTamanhoFonte();
		} else {
			alert("Por favor, insira um texto para descriptografar.");
		}
	});

	function aumentarTamanhoFonte() {
		let textoCriptoDescrip = document.querySelector(".texto-crip-descrip");
		if (textoCriptoDescrip) {
			textoCriptoDescrip.style.fontSize = "24px";
			textoCriptoDescrip.style.textAlign = "left";

		}
	}

	botaoCopia.addEventListener("click", function () {
		let textoEncontrado = document.querySelector(".texto-crip-descrip");
		if (textoEncontrado) {
			let textoCopiado = textoEncontrado.textContent;
			navigator.clipboard.writeText(textoCopiado).then(function () {
				console.log('Texto copiado com sucesso: ' + textoCopiado);
			}, function (err) {
				console.error('Erro ao copiar texto: ', err);
			});
		}
	});

	function exibirTexto(texto, descricao) {
		let infosDiv = document.querySelector(".infos");
		if (infosDiv) {
			infosDiv.innerHTML = `
						<textarea class="texto-crip-descrip" id="texto-criptografado" cols="30" rows="10" placeholder="">${texto}</textarea>
					`;
		}
	}

	function criptografarTexto(texto) {
		return texto.replace(/e/g, 'enter')
			.replace(/i/g, 'imes')
			.replace(/a/g, 'ai')
			.replace(/o/g, 'ober')
			.replace(/u/g, 'ufat');
	}

	function descriptografarTexto(texto) {
		return texto.replace(/enter/g, 'e')
			.replace(/imes/g, 'i')
			.replace(/ai/g, 'a')
			.replace(/ober/g, 'o')
			.replace(/ufat/g, 'u');
	}
});
