
    document.addEventListener("DOMContentLoaded", function(){
       let canvas = Array.from(document.getElementsByTagName("canvas"));
        document.oncontextmenu = ev =>{
            ev.preventDefault();
        }
        canvas.forEach(e => {
            e.addEventListener(e.id, pintaCanvas.bind(e));
            pintaCanvas.bind(e)();
        });
        
        function pintaCanvas (ev) {
            let contexto = this.getContext('2d');
            if (contexto) {
                contexto.font = "16px Roboto";
                if (ev == undefined) {
                    contexto.fillStyle = '#7B1803';
                } else {
                    
                    do {
                    contexto.fillStyle = generaColores();
                    } while (this.dataset.color == contexto.fillStyle);
                    this.dataset.color = contexto.fillStyle;
                }
                contexto.fillRect(0, 0, 300, 300);
                contexto.fillStyle = "white";
                contexto.fillText(this.getAttribute("id"), 30, 35);
                if (ev != undefined) {
                    contexto.fillText(`x = ${ev.offsetX}`, 150, 40);
                    contexto.fillText(`y = ${ev.offsetY}`, 150, 70);
                    contexto.fillText(`button = ${ev.button}`, 150, 100);
                    contexto.fillText(`buttons = ${ev.buttons}`, 150, 130);
    
                }
            }
        }

        function aleatorio (inferior, superior) {
            let numProbab = superior - inferior;
            let random = Math.random() * numProbab;
            return parseInt(random) + inferior;
        }
    
        function generaColores () {
            return "rgb(" + aleatorio(0, 50) + ", " + aleatorio(0, 50) + ", " + aleatorio(0, 50) + ")";

        }

    });
