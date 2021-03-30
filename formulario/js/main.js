/** 
 * @uthor Fernando del Rosal Cuesta.
 * Formulario completito
 */

document.addEventListener("DOMContentLoaded", function () {

    //declaracion de variables.
    let form = document.forms[0];
    let listaInput = Array.from(document.querySelectorAll("input"));
    let sexo = document.getElementsByName("sexo");
    let listaSpan = Array.from(document.querySelectorAll("span"));
    let selec = document.getElementsByName("select")[0];

    //invocacion y evento "click" al boton rellenar para cargar datos por defecto en los input.
    form.getElementsByTagName("button")[0]
        .addEventListener("click", function (ev) {
            ev.preventDefault();
            listaInput[0].value = "Texto de prueba";
            listaInput[1].checked = true;
            sexo[0].checked = true;
            listaInput[4].value = '2001-08-02';
            listaInput[5].value = 3;
            listaInput[6].value = 3.4;
            listaInput[7].value = 'correo@prueba.es';
            listaInput[8].value = 'https://www.google.es';
            listaInput[9].value = '03/02/2001';
            listaInput[10].value = '31011145S';
            listaInput[11].value = '777 888 999';
            listaInput[12].value = 'imagen_01.jpg';
            selec.value = "value1";
        });


    //Evento submit al formulario para comprobar que los datos introducidos son correctos,
    //disparar los eventos "blur" para cada campo del formulario y aplicar el foco alli
    //donde se de el primer error.
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        let eventoBlur = new Event("blur");//creacion de evento blur.

        //aplicacion de evento "blur" para cada campo del formulario.
        for (const input of listaInput) {
            //filtrado del tipo de campo. Solo se tiene en cuenta text, date y checkbox.
            if (input.type != "reset" && input.type != "submit" && input.type != "radio") {
                input.dispatchEvent(eventoBlur);
            }
        }
        selec.dispatchEvent(eventoBlur);//aplicacion de evento blur a select
        sexo[0].dispatchEvent(eventoBlur);//aplicacion de evento blur a radiobutton.

        //aplicacion de foco al primer input donde se detecte que hay un mensaje de error en el span.
        let span = listaSpan.find(e => e.innerHTML != "");
        if (span) {
            span.parentNode.firstElementChild.firstElementChild.focus();
        }else{
            form.reset();
            //retrasa la aparicion del alert para dar tiempo a que el evento reset limpie el formulario.
            setTimeout(() => {
                alert('Todo correcto.');
            }, 100);
            
        }
    });
    
    //Evento reset al formulario para limpiar los datos y los mensaje de error de los span.
    form.addEventListener("reset", function () {
        listaSpan.forEach(e => {
            e.innerHTML = "";
        });
    });

    //aplicacion de evento blur para comprobar que se han introducido los datos y que
    //son correctos.
    //aplicacion de evento focus para limpar el span de la derecha.
    for (const input of listaInput) {
        switch (input.type) {
            case 'radio':
                input.addEventListener("focus", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = "";
                });
                input.addEventListener("blur", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = validaciones.radio(sexo);
                });
                break;

            case 'checkbox':
                input.addEventListener("focus", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = "";
                });
                input.addEventListener("blur", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = validaciones.check(this.checked);
                });
                break;

            case 'date':
                input.addEventListener("focus", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = "";
                });
                input.addEventListener("blur", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = validaciones.comprobarValor(this.name, this.value);
                });
                break;

            case 'text':
                input.addEventListener("focus", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = "";
                });
                input.addEventListener("blur", function () {
                    this.parentNode.parentNode.lastElementChild.innerHTML = validaciones.comprobarValor(this.name, this.value);
                });
                break;
        }
    }

    //aplicacion del evento blur para comprobar que se ha seleccionado un valor.
    selec.addEventListener("blur", function () {
        this.parentNode.nextElementSibling.innerHTML = validaciones.select(this);
    });
    //aplicacion del evento focus al campo de seleccion del formulario.
    selec.addEventListener("focus", function () {
        this.parentNode.nextElementSibling.innerHTML = "";
    });
});