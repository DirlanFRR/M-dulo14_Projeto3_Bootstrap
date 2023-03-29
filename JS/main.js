$(document).ready(function() {
    $('#telefone').mask('(00) 00000-0000')
    $('form').validate({
        rules: {
            nomeCompleto: {
                required: true,
                nomeESobrenome: true,
                letras: true,
                minlength: 10
            },
            email: {
                required: true,
                email: true
            },
            telefone: {
                required: false,
                minlength:11,
               
            },
            mensagem: {
                required: true,
                minlength: 20,
                textoMinimo: true,
                textoValido: true,
                naoSomenteEspeciais: true
            }
        },
        messages: {
            nomeCompleto: {
                required: "Por favor, preencha seu nome completo.",
                letras: "Por favor, digite apenas letras." ,
                nomeESobrenome: "Por favor, digite seu nome e sobrenome separados por um espaço, apenas letras.",
               
            },
            telefone: {
                minlength: "O número de telefone deve ter 11 dígitos.",
              
            }
        }
    });

    // Validação em tempo real
    $('form').on('input', function() {
        $(this).validate().element('#nomeCompleto');
        $(this).validate().element('#email');
        $(this).validate().element('#mensagem');
    });

    // Impede que o texto contenha apenas espaços
    $.validator.addMethod("textoMinimo", function(value, element) {
        return this.optional(element) || $.trim(value.replace(/\s+/g, ' ')).length >= 20;
    }, "Por favor, digite pelo menos 20 caracteres.");

    // que verifica se o valor de um campo de entrada contém apenas letras, números, espaços em branco e caracteres especiais. Impedindo que contenha apenas números.
    $.validator.addMethod("textoValido", function(value, element) {
        return this.optional(element) || /^[A-Za-zÁáÀàÂâÃãÉéÈèÊêÍíÏïÓóÔôÕõÖöÚúÜüÇçÑñ\s\d\W]+$/.test(value) && !/^\d+$/.test(value);
      }, "Por favor, digite um texto válido.");

      // Impede o campo de conter apenas caracteres especiais.
      $.validator.addMethod("naoSomenteEspeciais", function(value, element) {
        return this.optional(element) || /[a-zA-Z0-9]+/.test(value);
    }, "O campo não pode conter apenas caracteres especiais.");
      
   
    // Adiciona uma nova regra de validação para nome completo
    $.validator.addMethod("nomeESobrenome", function(value, element) {
        return this.optional(element) || /^[a-záàâãéèêíïóôõöúçñ]+(\s[a-záàâãéèêíïóôõöúçñ]+)+$/i.test(value);
    }, "Por favor, digite seu nome e sobrenome separados por um espaço, apenas letras.");

    $.validator.addMethod("letras", function(value, element) {
        return this.optional(element) || /^[A-Za-zÁáÀàÂâÃãÉéÈèÊêÍíÏïÓóÔôÕõÖöÚúÜüÇçÑñ\s]+$/.test(value);
    },"Por favor, digite apenas letras.");


    $('form').submit(function(event) {
        event.preventDefault();
  
        // Verifica se o formulário é válido antes de enviar
        if($('form').valid()) {
            // Insira aqui o código que deseja executar ao enviar o formulário
            alert('Formulário enviado com sucesso!');
            $('form')[0].reset(); // Limpa os campos do formulário
            $('form').validate().resetForm(); // Remove as mensagens de erro
        }
    });
});
