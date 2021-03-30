/**
 * @author Fernando del Rosal Cuesta.
 * Script de validaciones para el formulario.
 */

/**
 * funcion clousure de validacion de datos.
 */
let validaciones = (function () {

    /**
     * Objeto de arrays con las expresiones regulares para validar los campos y sus messajes de error.
     */
    let expRegex = {
        texto: [
            /^[A-Za-z\s]+$/,
            "Error, debes introducir una cadena de texto valida sin numeros ni caracter raros."
        ],
        numEntero: [
            /^[-0-9]{0,}$/,
            "Error, formato aceptado: 1 o 5678 0 -9"
        ],
        numDecimal: [
            /^[[0-9]+([,|.][0-9]+)]?$/,
            "Error, formato aceptado: 1,3 o 1,456 o 1.456"
        ],
        correo: [
            /^((\w){2,}\.)*((\w){2,})\@(\w){2,}\.(\w){2,3}(\.(\w){2,3})*$/i,
            "Error, formato aceptado: prueba@correo.es, prueba@correo.com  "
        ],
        url: [
            /^http[s]?:\/\/([w]{3}\.)?[a-z]{3,}\.[a-z]{2,3}((\.|\/)?[a-z]{2,})?$/,
            "Error, formato aceptado: https://www.google.es o http://www.google.es"
        ],
        fecha: [
            /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/,
            "Error, formato aceptado: 01/01/2001, 01-01-2001"
        ],
        dni: [
            /^(\d{8})[ -]?([A-Z(^IÑOU)]$)/i,
            ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'],
            "Error, formato aceptado: 31011145S"
        ],
        telefono: [
            /^(\(\+?\d{2,4}\))?([. ])?(\d{3})([. ])?(\d{3})([. ])?(\d{3})$/,
            "Error, formato aceptado: Ejemplo 678954321"
        ],
        imagen: [
            /^[[a-z_0-9]+([.](jpg|png)+)]?$/,
            "Error, formato aceptado: imagen.jpg, imagen.png, imagen_01.jpg, imagen_01.png"
        ]
    }

    /**
     * Funcion que valida el dato con la expresion regular y devuelve una cadena vacia si se ha validado 
     * de forma satisfactoria o el error de la expresion regular.
     * @param {*} exp 
     * @param {*} error 
     * @param {*} dato 
     * @returns 
     */
    let validaDato = function (exp, error, dato) {

        return exp.exec(dato) ? "" : error;
    }

    /**
     * funcion para comprobar el valor introducido en el imput el cual se identidica por el atributo
     * name de cada input.
     * @param {*} name 
     * @param {*} dato 
     * @returns 
     */
    let comprobarValor = function (name, dato) {

        switch (name) {
            case "texto":
                return validaDato(expRegex.texto[0], expRegex.texto[1], dato);
            case "fechaObli":
                return existeFecha(dato);
            case "numEntero":
                let numero = parseInt(dato)
                return validaDato(expRegex.numEntero[0], expRegex.numEntero[1], numero);
            case "numDecimal":
                return validaDato(expRegex.numDecimal[0], expRegex.numDecimal[1], dato);
            case "correo":
                return validaDato(expRegex.correo[0], expRegex.correo[1], dato);
            case "url":
                return validaDato(expRegex.url[0], expRegex.url[1], dato);
            case "fecha":
                return validaDato(expRegex.fecha[0], expRegex.fecha[1], dato);
            case "telefono":
                return validaDato(expRegex.telefono[0], expRegex.telefono[1], dato);
            case "imagen":
                return validaDato(expRegex.imagen[0], expRegex.imagen[1], dato);
            case "dni":
                try {

                    let [, numero, letra] = expRegex.dni[0].exec(dato);
                    return (expRegex.dni[1][numero % 23] == letra.toUpperCase() ? "" : "Por favor, introduce la letra correcta.")

                } catch (err) {
                    return expRegex.dni[2];
                }
        }

    }

    /**
     * funcion que comprueba si el checkbox ha sido clicado.
     * @param {*} checkbox 
     * @returns 
     */
    let check = function (checkbox) {
        if (!checkbox)
            return "Debes aceptar las condiciones";
        return "";
    }

    /**
     * funcion que comprueba si se ha seleccionado un valor en el select.
     * @param {*} seleccion 
     * @returns 
     */
    let select = function (seleccion) {
        if ("".includes(seleccion.value))
            return "Debes seleccionar una opcion.";
        return "";
    }

    /**
     * Funcion que comprueba si el radiobutton esta checkeado.
     * @param {*} radios 
     * @returns 
     */
    let radio = function (radios) {
        return radios[0].checked || radios[1].checked ? "" : `Debes seleccionar un sexo.`;
    }

    /**
     * funcion para validar el formato de la fecha introducida en el campo de tipo date.
     * @param {*} fecha 
     * @returns 
     */
    function existeFecha(fecha) {
        let fechaf = fecha.split("-");
        let day = fechaf[2];
        let month = fechaf[1];
        let year = fechaf[0];

        return isValid(day, month, year) ? "" : `Formato de fecha incorrecto`;
    }

    /**
     * funcion que comprueba los dias que tiene cada mes y si el año es bisiesto o no.
     * @param {*} m 
     * @param {*} y 
     * @returns 
     */
    function daysInMonth(m, y) {
        switch (m) {
            case 2:
                return (y % 4 == 0 && y % 100) || y % 400 == 0 ? 29 : 28;
            case 9: case 4: case 6: case 11:
                return 30;
            default:
                return 31
        }
    }

    /**
     * funcion que comprueba que la fecha pasada por parametro es valida.
     * @param {*} d 
     * @param {*} m 
     * @param {*} y 
     * @returns 
     */
    function isValid(d, m, y) {
        return m > 0 && m <= 12 && d > 0 && d <= daysInMonth(m, y);
    }

    return {
        comprobarValor: comprobarValor,
        check: check,
        select: select,
        radio: radio
    };
}());