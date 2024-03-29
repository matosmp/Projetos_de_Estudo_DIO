function start() { // Inicio da função start()

	$("#inicio").hide(); // Ocultando a div início

	//Criando novas div dentro da div fundoGame
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	

	//Principais variáveis do jogo
	let pontos=0;
	let salvos=0;
	let perdidos=0;
	let fimdejogo = false;
	let podeAtirar = true;
	let jogo = {}
	let velocidade = 5;
	let posicaoY = parseInt(Math.random() * 334); // Gerar posição aleatória entre 0 e 334 px
	let TECLA = {
		W: 87,
		S: 83,
		D: 68
	}

	jogo.pressionou = [];

	//Verifica se o usuário pressionou alguma tecla	
	$(document).keydown(function (e) { // keydown verificar se foi pressionada alguma tela
		jogo.pressionou[e.which] = true;
	});


	$(document).keyup(function (e) { // keyup significa que não tem nenhuma tecla pressiona no momento
		jogo.pressionou[e.which] = false;
	});


	//Game Loop
	jogo.timer = setInterval(loop, 30);

	function loop() {

		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();
		placar();

	} // Fim da função loop()


	//Função que movimenta o fundo do jogo
	function movefundo() { // Função para criar a sensação de movimentação na tela

		esquerda = parseInt($("#fundoGame").css("background-position")); /* Convertendo fundoGame para obter o valor atual do fundo 
																			da div . Por padrão a position é zero.  */
		$("#fundoGame").css("background-position", esquerda - 1); // Atualizando a posição do fundo, ou seja, irá caminhar 1px para a esquerda

	} // fim da função movefundo()

	function movejogador() {

		if (jogo.pressionou[TECLA.W]) {
			let topo = parseInt($("#jogador").css("top")); // convertendo para obter o valor da posição em inteiro
			$("#jogador").css("top", topo - 10); // Atualizando a div, ou seja, 10px para cima.

			if (topo <= 0) {

				$("#jogador").css("top", topo + 10);
			}
		}

		if (jogo.pressionou[TECLA.S]) {

			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo + 10); // Atualizando para o helicoptero descer 10px

			if (topo >= 434) {
				$("#jogador").css("top", topo - 10);

			}
		}

		if (jogo.pressionou[TECLA.D]) {
			disparo();
		}
	}

	function moveinimigo1() {

		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left", posicaoX - velocidade);
		$("#inimigo1").css("top", posicaoY);

		if (posicaoX <= 0) {
			posicaoY = parseInt(Math.random() * 334); // Posicionando aleatóriamente o helicóptero inimigo
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);

		}
	} //Fim da função moveinimigo1()

	function moveinimigo2() {
		posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left", posicaoX - 3);

		if (posicaoX <= 0) {

			$("#inimigo2").css("left", 775);

		}
	} // Fim da função moveinimigo2()

	function moveamigo() {

		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left", posicaoX + 1);

		if (posicaoX > 906) {

			$("#amigo").css("left", 0);

		}

	} // fim da função moveamigo()

	function disparo() {

		if (podeAtirar == true) {

			podeAtirar = false;

			topo = parseInt($("#jogador").css("top"))
			posicaoX = parseInt($("#jogador").css("left"))
			tiroX = posicaoX + 190;
			topoTiro = topo + 37;
			$("#fundoGame").append("<div id='disparo'></div");
			$("#disparo").css("top", topoTiro);
			$("#disparo").css("left", tiroX);

			var tempoDisparo = window.setInterval(executaDisparo, 30);

		} //Fecha podeAtirar

		function executaDisparo() {
			posicaoX = parseInt($("#disparo").css("left"));
			$("#disparo").css("left", posicaoX + 15);

			if (posicaoX > 900) {

				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;

			}
		} // Fecha executaDisparo()
		
	} // Fecha disparo()

	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));

		// jogador com o inimigo1
		if (colisao1.length > 0) {

			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X, inimigo1Y);

			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);
		}

		// jogador com o inimigo2 
		if (colisao2.length > 0) {

			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X, inimigo2Y);

			$("#inimigo2").remove();

			reposicionaInimigo2();

		}

		// Disparo com o inimigo1 --> Colisão 3
		if (colisao3.length > 0) {

			pontos=pontos+100;
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));

			explosao1(inimigo1X, inimigo1Y);
			$("#disparo").css("left", 950);

			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);

		}

		// Disparo com o inimigo2
		if (colisao4.length > 0) {
			
			pontos=pontos+50;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();

			explosao2(inimigo2X, inimigo2Y);
			$("#disparo").css("left", 950);

			reposicionaInimigo2();

		}

		// jogador com o amigo
		if (colisao5.length > 0) {

			salvos++;
			reposicionaAmigo();
			$("#amigo").remove();
		}

		//Inimigo2 com o amigo
		if (colisao6.length > 0) {

			perdidos++;
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX, amigoY);
			$("#amigo").remove();

			reposicionaAmigo();

		}


	} //Fim da função colisao()

	//Explosão 1
	function explosao1(inimigo1X, inimigo1Y) {
		$("#fundoGame").append("<div id='explosao1'></div");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div = $("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({ width: 200, opacity: 0 }, "slow");// animate é uma função do JQuery

		var tempoExplosao = window.setInterval(removeExplosao, 1000);

		function removeExplosao() {

			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;

		}

	} // Fim da função explosao1()


	//Reposiciona Inimigo2
	function reposicionaInimigo2() {

		var tempoColisao4 = window.setInterval(reposiciona4, 5000);

		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4 = null;

			if (fimdejogo == false) {

				$("#fundoGame").append("<div id=inimigo2></div");

			}

		}
	}



	//Explosão2
	function explosao2(inimigo2X, inimigo2Y) {

		$("#fundoGame").append("<div id='explosao2'></div");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2 = $("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({ width: 200, opacity: 0 }, "slow");

		var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

		function removeExplosao2() {

			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2 = null;
		}
	} // Fim da função explosao2()

	//Explosão3

	function explosao3(amigoX, amigoY) {
		$("#fundoGame").append("<div id='explosao3' class='anima4'></div");
		$("#explosao3").css("top", amigoY);
		$("#explosao3").css("left", amigoX);
		var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
		function resetaExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3 = null;

		}

	} // Fim da função explosao3

	function placar() {
	
		$("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar()

	//Reposiciona Amigo
	function reposicionaAmigo() {

		var tempoAmigo = window.setInterval(reposiciona6, 6000);

		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;

			if (fimdejogo == false) {

				$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

			}

		}

		//Reposiciona Amigo

		function reposicionaAmigo() {

			var tempoAmigo = window.setInterval(reposiciona6, 6000);

			function reposiciona6() {
				window.clearInterval(tempoAmigo);
				tempoAmigo = null;

				if (fimdejogo == false) {

					$("#fundoGame").append("<div id='amigo' class='anima3'></div>");

				}

			}

		} // Fim da função reposicionaAmigo()




	} // Fim da função start

}


