
var i = 1;  //Indice para arreglo de notas
var reminder = [];  //Arreglo de notas
var inputs = [];    //Arreglo de contenedores

    // Revisar si se ha dado enter para registar lo que se ingreso en el text box
    var input = document.getElementById("txt_reminder"); 
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn_add").click();
    }
    });



function add(t){
    reminder.push({ //Agregar una nueva tarea con id, el texto de la tarea y una bandera para marcarla
        idRem: ('span'+i),
        param: t,
        flag: false
    });
}

function remind(){
    
    var text = document.getElementById("txt_reminder").value;

    //Comprobar primero si no está vacío
    if(text!= ""){
        add(text);  //Enviar el texto leído del input para guardar en arreglo
        document.getElementById("information").style.visibility = 'visible'; //Hacer visible la informacion sobre las tareas
        document.getElementById("txt_reminder").value = "";     //Limpiar la entrada de texto
        var div = document.createElement('div');    //crear el elemento padre donde estarán el texto y la imagen
        div.setAttribute('class','border border-secondary rounded texto'); //Otorgar  atributos
        var sp = document.createElement('span');     //crear elemento donde estará el texto
        sp.setAttribute('id',('span'+i));
        sp.setAttribute('onclick','mark(this.id)');
        sp.innerHTML = reminder[i-1].param;     //Escribir el texto dentro del elemento
        var del = document.createElement('img');    //Crear elemento de imagen para eliminar tarea
        del.setAttribute('id',i);
        del.setAttribute('src','https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png');
        del.setAttribute('class','ex');
        del.setAttribute('onclick','eliminar(this.id)');

        div.appendChild(sp); //insertar texto dentro del div creado
        div.appendChild(del); //insertar imagen dentro del div creado

        inputs.push(div); //Agregar el div creado al arreglo de contenedores
        document.getElementById("notas").appendChild(div);  //Insertar tarea dentro de div de notas
       
        i++;
    }
    else{ //Si está vacía desplegar advertencia
        
        swal({ //Sweet Alert warning
            title: "¡Atención!",
            text: "Debes escribir una tarea para agregarla a la lista",
            icon: "warning"
          });
    }

}

//Eliminar recibe el indice del elemento del arreglo que se quiere borrar
function eliminar(id_elim){
    document.getElementById("notas").innerHTML = "";    //Limpiar el contenedor de notas para actualizarlo

    reminder.splice(id_elim-1,1);   //Quitar la tarea del arreglo según el índice indicado
    inputs.splice(id_elim-1,1);     //Quitar el contenedor del arreglo según el índice indicado

    //Ciclo para cambiar ids
    for (var cont=0; cont < inputs.length ; cont++){
        var inp = inputs[cont].childNodes;  //Buscar los elementos dentro del contenedor indicado
        inp[0].id = 'span'+(cont+1);    //Modificar el id de cada elemento (2)
        inp[1].id = cont+1;             
    }

    //Ciclo para actualizar el contenedor de notas
    for(let cont = 0; cont<inputs.length; cont++){
        var div = document.createElement('div');    //crear div
        div = inputs[cont];     //Asignar el contenedor correspondiente del arreglo
        document.getElementById("notas").appendChild(div);  //Insertar el elemento en el contenedor de notas

    }

    //Si el contenedor se quedó sin elementos, quitar las instrucciones de la pantalla
    if(inputs.length==0){
        document.getElementById("information").style.visibility = 'hidden';

    }

    i=inputs.length+1;  //actualizar el último índice para seguir insertando tareas
}


function deleteAll(){
    reminder.splice(0,reminder.length); //Borrar todos los elementos del arreglo
    inputs.splice(0,inputs.length); 
    document.getElementById("notas").innerHTML = "";    //Limpiar el contenedor de notas
    document.getElementById("information").style.visibility = 'hidden'; //Ocultar las instrucciones

    i=1; 
}

function mark(id_marked){

    //Buscar en el arreglo el índice en el que coincide el id solicitado para tachar (id_marked) 
    var marked_index = reminder.findIndex(function(element){
        return element.idRem == id_marked;  //Retorna el índice encontrado
    });


    if(!reminder[marked_index].flag){   //Si la bandera del elemento indica que no está marcado
        document.getElementById(id_marked).style.textDecoration = 'line-through';   //El texto se tacha
        reminder[marked_index].flag = true;
    }
    else{   //Si la bandera del elemento indica que está marcado
        document.getElementById(id_marked).style.textDecoration = 'none';   //Se quita la línea
        reminder[marked_index].flag = false;
    }
}