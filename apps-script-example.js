function doGet() {
  const formId = '1pTKO5ZGnQWJ7WBxDyepMbHLKoYRyqWkms_SqiYggzTE'; // Substitua pelo ID do seu formulário
  const form = FormApp.openById(formId);
  const items = form.getItems();
  
  // Mapeamento das respostas corretas baseado no índice da pergunta
  const correctAnswers = [
    2,  // question_0 - QUAL DESSES É UM PERIFÉRICO DE ENTRADA? = WEBCAM (CÂMERA)
    0,  // question_1 - QUAL É A DEFINIÇÃO DE HARDWARE? = Hardware é a parte física do computador
    2,  // question_2 - NA ARQUITETURA DOS COMPUTADORES... = RAM
    2,  // question_3 - QUAL O FATOR QUE MOTIVOU A CRIAÇÃO DA ARPANET = Guerra Fria
    3,  // question_4 - QUAL O ORGÃO RESPONSÁVEL PELA CRIAÇÃO DA ARPANET? = DARPA
    2,  // question_5 - NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTAR O IP = ipconfig
    1,  // question_6 - NO CMD, QUAL O COMANDO RESPONSÁVEL POR PROGRAMAR O DESLIGAMENTO = shutdown -s -t
    0,  // question_7 - NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTRAR O HISTÓRICO DO ROTEADOR = arp -a
    4,  // question_8 - NO CMD, QUAL O COMANDO RESPONSÁVEL POR LIMPAR O HISTÓRICO DO ROTEADOR = /flushDNS
    4,  // question_9 - QUAL DESSES É UM PROGRAMA OPERACIONAL? = EXPLORER
    0,  // question_10 - QUAL A DEFINIÇÃO DE SOFTWARE? = Software é a parte lógica do computador
    1,  // question_11 - QUAL DAS SEGUINTES OPÇÕES É UTILIZADA PARA ALTERAR A APARÊNCIA = Ferramenta de Formatação de Fonte
    1,  // question_12 - QUAL É A FUNÇÃO DO COMANDO "QUEBRA DE SEÇÃO" = Iniciar uma nova página com formatação distinta
    1,  // question_13 - O QUE SIGNIFICA O TERMO "CABEÇALHO" = Uma área no topo de cada página, usada para informações de orientação
    1,  // question_14 - QUAL A DIFERENÇA ENTRE "SALVAR" E "SALVAR COMO"? = "Salvar" atualiza o arquivo existente
    1,  // question_15 - PARA QUE SERVE O RECURSO "HIFENIZAÇÃO" = Para dividir palavras no final das linhas
    1,  // question_16 - Qual a função da opção "Visualizar Impressão"? = Mostra como o documento ficará após ser impresso
    1,  // question_17 - O QUE SÃO "NOTAS DE RODAPÉ" E "NOTAS DE FIM"? = São textos explicativos ou referências
    1,  // question_18 - QUAL O PROPÓSITO DE USAR "COLUNAS" = Para organizar o texto em blocos verticais
    1   // question_19 - O QUE O RECURSO "CONTROLE DE ALTERAÇÕES" = Registrar todas as modificações feitas
  ];
  
  const questions = [];
  
  items.forEach((item, index) => {
    if (item.getType() === FormApp.ItemType.MULTIPLE_CHOICE) {
      const multipleChoiceItem = item.asMultipleChoiceItem();
      const choices = multipleChoiceItem.getChoices();
      const questionTitle = item.getTitle();
      
      // Busca a resposta correta no mapeamento por índice
      const correctAnswer = correctAnswers[index] || 0;
      
      const questionData = {
        id: `question_${index}`,
        question: questionTitle,
        options: choices.map(choice => choice.getValue()),
        correctAnswer: correctAnswer,
        points: 10
      };
      
      questions.push(questionData);
    }
  });
  
  const response = {
    questions: questions,
    formTitle: form.getTitle(),
    totalQuestions: questions.length
  };
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}