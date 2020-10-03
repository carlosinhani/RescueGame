// Inicio da função start

function start() {
    $("#inicio") .hide();

    $("#fundoGame") .append("<div id='jogador' class='anima1'></div>");
    $("#fundoGame") .append("<div id='inimigo1' class='anima2'></div>");
    $("#fundoGame") .append("<div id='inimigo2'></div>");
    $("#fundoGame") .append("<div id='amigo' class='anima3'></div>");
    $("#fundoGame") .append("<div id='placar'></div>");
    $("#fundoGame") .append("<div id='energia'></div>");


    //Principais variáveis do jogo 

    let pontos= 0;
    let salvos= 0;
    let perdidos= 0;
    let energiaAtual= 3;
    let podeAtirar= true;
    let posicaoY = parseInt(Math.random() * 334);
    const jogo = {};
    const fimDeJogo= false;
    const velocidade = 5;
    const TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
     
     jogo.pressionou = [];

    // Verifica se o usuário pressionou alguma tecla
    
     $(document).keydown(function(e){
         jogo.pressionou[e.which] = true;
     }); 

     $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    }); 
   


    //Game Loop
       jogo.timer = setInterval(loop,30);

       function loop() {
       movefundo();
       movejogador();
       moveinimigo1();
       moveinimigo2();
       moveamigo();
       colisao();
       placar();
       energia();
    }// Fim da função loop ()

      
     // Função que movimenta o fundo do jogo      
     
     function movefundo() {
         esquerda = parseInt($("#fundoGame").css("background-position"));
         $("#fundoGame").css("background-position", esquerda-2);

     } // Fim da função movefundo


     // Função que movimenta o jogador
      
     function movejogador() {
         if(jogo.pressionou[TECLA.W]) {
             const topo = parseInt($("#jogador").css("top"));
             $("#jogador").css("top",topo-10);
              if (topo<=0) {
                  $("#jogador").css("top",topo+10);
              }               
         }
         if(jogo.pressionou[TECLA.S]) {
            const topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo+10);
              if (topo>=434) {
                  $("#jogador").css("top", topo-10);
              }
        }
         if (jogo.pressionou[TECLA.D]){ //Chama função Disparo 
              disparo();
         }

     }// Fim da Função movejogador()


     //Função movimenta o inimigo 1

     function moveinimigo1() {
         posicaoX = parseInt($("#inimigo1").css("left"));
         $("#inimigo1").css("left",posicaoX-velocidade);
         $("#inimigo1").css("top",posicaoY);

             if (posicaoX<=0) {
                 posicaoY = parseInt(Math.random() * 334);
                 $("#inimigo1").css("left",694);
                 $("#inimigo1").css("top",posicaoY);

             }
     } // Fim da função move inimigo 1


      // Função movimenta o inimigo 2 
      
     function moveinimigo2() {
         posicaoX = parseInt($("#inimigo2").css("left"));
         $("#inimigo2").css("left",posicaoX-4);
            if (posicaoX<=0) {
                $("#inimigo2").css("left",775);
            }

      } // Fim da  função move  inimigo 2
      

      //Função movimento do amigo
      
     function moveamigo() {
         posicaoX = parseInt($("#amigo").css("left"));
         $("#amigo").css("left",posicaoX+1);
            if (posicaoX>906) {
                $("#amigo").css("left",0);
            }
      } // Fim da função movimenta o amigo


      // Função disparo


      function disparo() {
          if (podeAtirar==true) {
             
            podeAtirar=false;
            topo = parseInt($("#jogador").css("top"))
            posicaoX= parseInt($("#jogador").css("left"))
            tiroX = posicaoX + 190;
            topoTiro=topo+37;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top",topoTiro);
            $("#disparo").css("left",tiroX);

            var tempoDisparo=window.setInterval(executaDisparo, 30);
          
          }

       // Função executa Disparo
            
       function executaDisparo() {
         posicaoX = parseInt($("#disparo").css("left"));
         $("#disparo").css("left", posicaoX+15);

           //Função executa Disparo
         
                if (posicaoX >900) {                
                    window.clearInterval(tempoDisparo);
                    tempoDisparo=null;
                    $("#disparo").remove();
                    podeAtirar=true;
                }

        }// Fecha execute Disparo()
       }// Fecha disparo ()        
        
        // Função Colisão

        function colisao(){
            const colisao1 = ($("#jogador").collision($("#inimigo1")));        
            const colisao2 = ($("#jogador").collision($("#inimigo2")));
            const colisao3 = ($("#disparo").collision($("#inimigo1")));
            const colisao4 = ($("#disparo").collision($("#inimigo2")));
            const colisao5 = ($("#jogador").collision($("#amigo")));
            const colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        
            // jogador com  o inimigo 1
            if (colisao1.length>0) {
                energiaAtual--;
                inimigo1X = parseInt($("#inimigo1").css("left"));
                inimigo1Y = parseInt($("#inimigo1").css("top"));
                explosao1(inimigo1X,inimigo1Y);

                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top", posicaoY);
            }
            
            // jogador com inimigo 2
            if (colisao2.length>0){
                energiaAtual--;
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                explosao2 (inimigo2X,inimigo2Y);

                $("#inimigo2").remove();

                reposocionaInimigo2();
            } 
            
            // Disparo com o inimigo 1

            if (colisao3.length>0) {
                pontos=pontos+100;
                inimigo1X= parseInt($("#inimigo1").css("left"));
                inimigo1Y= parseInt($("#inimigo1").css("top"));

                explosao1(inimigo1X,inimigo1Y);
                $("#disparo").css("left", 950);

                posicaoY = parseInt(Math.random() * 334);
                $("#inimigo1").css("left", 694);
                $("#inimigo1").css("top", posicaoY);
            }

            // Disparo com inimigo 2

            if (colisao4.length>0) {
                pontos=pontos+50;
                inimigo2X = parseInt($("#inimigo2").css("left"));
                inimigo2Y = parseInt($("#inimigo2").css("top"));
                $("#inimigo2").remove();

                explosao2(inimigo2X,inimigo2Y);
                $("#disparo").css("left",950);

                reposocionaInimigo2();
            }

            // Jogador com amigo

            if (colisao5.length>0) {
              salvos++;  
              reposicionaAmigo();
              $("#amigo").remove();
            }

            // Inimigo 2 com o amigo

            if (colisao6.length>0){
                perdidos++;
                amigoX = parseInt($("#amigo").css("left"));
                amigoY = parseInt($("#amigo").css("top"));
                explosao3(amigoX,amigoY);
                $("#amigo").remove();

                reposicionaAmigo();
            }

        
          } // Fim da função colisão ()
        

        // Explosão 1

        function explosao1(inimigo1X,inimigo1Y) {
          $("#fundoGame").append("<div id='explosao1'></div>");
          $("#explosao1").css("background-image", "url(imgs/explosao.png)");
          const div=$("#explosao1");
          div.css("top", inimigo1Y);
          div.css("left", inimigo1X);
          div.animate({width:200, opacity:0}, "slow");

          let tempoExplosao=window.setInterval(removeExplosao, 1000);
              
              function removeExplosao() {
                  div.remove();
                  window.clearInterval(tempoExplosao);
                  tempoExplosao=null;
              }

        } // Fim da função explosao1 ()

        //Reposiciona Inimigo 2

        function reposocionaInimigo2() {
            let tempoColisao4=window.setInterval(reposiciona4, 5000);
             
               function reposiciona4() {
                   window.clearInterval(tempoColisao4);
                   tempoColisao4=null;

                   if (fimDeJogo==false) {

                    $("#fundoGame").append("<div id=inimigo2></div>");
                   }
               }
              
        }
        
        // Explosão 2
        
        function explosao2 (inimigo2X,inimigo2Y) {
          $("#fundoGame").append("<div id='explosao2'></div>");
          $("#explosao2").css("background-image", "url(imgs/explosao.png)");
          const div2=$("#explosao2");
          div2.css("top", inimigo2Y);
          div2.css("left", inimigo2X);
          div2.animate({width:200, opacity:0}, "slow");

          let tempoExplosao2=window.setInterval(removeExplosao2, 1000);
              
              function removeExplosao2() {
                  div2.remove();
                  window.clearInterval(tempoExplosao2);
                  tempoExplosao=null;
              }      
        }// Fim da função explosao2 ()

        // Reposiciona Amigo
        
        function reposicionaAmigo() {
          let tempoAmigo=window.setInterval(reposiciona6, 6000);
            
            function reposiciona6() {
               window.clearInterval(tempoAmigo);
               tempoAmigo=null;
            
               if (fimDeJogo==false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
               }
            }
        }// Fim da  função reposiciona Amigo

        // Explosao 3
        function explosao3(amigoX,amigoY) {
            $("#fundoGame").append("<div id='explosao3' class='anima4'></div>");
            $("#explosao3").css("top",amigoY);
            $("#explosao3").css("left", amigoX);
            let tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
             
             function resetaExplosao3() {
                 $("#explosao3").remove();
                 window.clearInterval(tempoExplosao3);
                 tempoExplosao3=null;
             }

        } // Fim da função explosao       


        // Funcão Placar

        function placar() {
            $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos " + perdidos + "</h2>");

        }// Fim da Função Placar()
         
        
        //Função energia 

        function energia() {
            if (energiaAtual==3) {
                $("#energia").css("background-image", "url(imgs/energia3.png)");
            }
            if (energiaAtual==2) {
                $("#energia").css("background-image", "url(imgs/energia2.png)");
            }
            if (energiaAtual==1) {
                $("#energia").css("background-image", "url(imgs/energia1.png)");
            }
            if (energiaAtual==0) {
                $("#energia").css("background-image", "url(imgs/energia0.png)");
            
            }//Game Over
        }// Fimm da Função energia 


} // Fim da função start