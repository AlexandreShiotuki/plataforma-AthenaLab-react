export const OBR_Course = {
    id: 1,
    title: "Introdução à OBR",
    desc: "Aprenda a construir e programar o seu robô autônomo.",
    duration: "4h",
    thumbnail: "/thumbnails/OBR_Course/capa_introdOBR.png",

    lessons: [
        {
            id: 1,
            title: "Aula 01 - Apresentação da Modalidade",
            videoUrl: "https://www.youtube.com/watch?v=e1N528S5x68&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=1",
            desc: "Entenda as regras fundamentais da OBR Prática: como funciona a pontuação por zonas, o tempo de calibração na arena, penalidades e o objetivo final de resgate.",
            duration: "11m"
        },
        {
            id: 2,
            title: "Aula 02 - Introdução ao Tinkercad",
            videoUrl: "https://www.youtube.com/watch?v=yv-f59r2UQ4&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=2",
            desc: "Primeiros passos no simulador: aprenda a criar sua conta, navegar pelo painel de componentes e a importância de testar seus circuitos virtualmente antes da montagem real.",
            duration: "18m"
        },
        {
            id: 3,
            title: "Aula 03 - Arduino: O que é e como funciona",
            videoUrl: "https://www.youtube.com/watch?v=IvGJwSD65R8&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=3",
            desc: "Descubra o cérebro do robô. Entenda a diferença entre o microcontrolador e um computador, e como funcionam as portas de entrada e saída (Digitais vs Analógicas).",
            duration: "15m"
        },
        {
            id: 4,
            title: "Aula 04 - Componentes fundamentais: Matriz de contato, jumpers e fontes de alimentação",
            videoUrl: "https://www.youtube.com/watch?v=zD-ocnUAyE8&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=4",
            desc: "Domine a Protoboard: entenda a lógica das colunas e linhas de alimentação para conectar componentes eletrônicos de forma organizada e segura usando jumpers.",
            duration: "14m"
        },
        {
            id: 5,
            title: "Aula 05 - Componentes fundamentais: LEDs e Resistores (TEORIA)",
            videoUrl: "https://www.youtube.com/watch?v=uhpxyHmZzNA&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=5",
            desc: "Teoria essencial da eletrônica: compreenda a Lei de Ohm, a função de limitação de corrente dos resistores e a polaridade (Anodo e Cátodo) dos LEDs.",
            duration: "22m"
        },
        {
            id: 6,
            title: "Aula 06 - Componentes fundamentais: LEDs e Resistores (PRÁTICA)",
            videoUrl: "https://www.youtube.com/watch?v=9js3tggHnWA&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=6",
            desc: "Mão na massa: montagem prática do circuito de iluminação, utilização de potenciômetros para variar a intensidade e como ler o código de cores dos resistores.",
            duration: "19m"
        },
        {
            id: 7,
            title: "Aula 07 - Projeto com Arduino: Semáforo",
            videoUrl: "https://www.youtube.com/watch?v=_a-GWkADeAA&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=7",
            desc: "Seu primeiro projeto de automação: programe a lógica de um semáforo de trânsito utilizando comandos de tempo (delay) e controle sequencial de portas digitais.",
            duration: "20m"
        },
        {
            id: 8,
            title: "Aula 08 - Sensores e seus usos",
            videoUrl: "https://www.youtube.com/watch?v=oJJIqkG8NYQ&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=8",
            desc: "Como o robô percebe o mundo: funcionamento detalhado dos sensores ultrassônicos (distância), infravermelhos (linha/obstáculo) e giroscópios (orientação).",
            duration: "25m"
        },
        {
            id: 9,
            title: "Aula 09 - Atuadores e seus usos",
            videoUrl: "https://www.youtube.com/watch?v=zxhTu-n-tXA&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=9",
            desc: "Como o robô interage com o ambiente: conheça os principais tipos de atuadores, incluindo Motores DC, Servos Motores, displays LCD e sistemas pneumáticos.",
            duration: "21m"
        },
        {
            id: 10,
            title: "Aula 10 - Controlando o robô por Bluetooth",
            videoUrl: "https://www.youtube.com/watch?v=ovgzr8zzweA&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=10",
            desc: "Conectividade sem fio: aprenda a integrar o módulo Bluetooth (HC-05/06) ao Arduino, fazendo a ligação cruzada dos pinos TX/RX para controle via celular.",
            duration: "16m"
        },
        {
            id: 11,
            title: "Aula 11 - Robô seguidor de linha",
            videoUrl: "https://www.youtube.com/watch?v=Yu_0Ma3eWsI&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=11",
            desc: "A lógica da competição: como utilizar sensores de reflectância para identificar o contraste entre o chão branco e a linha preta para manter o robô na trajetória.",
            duration: "24m"
        },
        {
            id: 12,
            title: "Aula 12 - Categoria OBR: Robô de Resgate",
            videoUrl: "https://www.youtube.com/watch?v=-MELYtUT7Is&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=12",
            desc: "Desafios avançados da arena: identificação de vítimas (bolinhas prateadas/pretas), superação de GAPs (falhas na linha), redutores de velocidade e intersecções verdes.",
            duration: "28m"
        },
        {
            id: 13,
            title: "Aula 13 - Customização do robô",
            videoUrl: "https://www.youtube.com/watch?v=eXLU4ZGSmhs&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=13",
            desc: "Design e Engenharia: a importância de manter o centro de massa baixo para estabilidade, o uso estratégico da roda boba e personalização da carcaça.",
            duration: "17m"
        },
        {
            id: 14,
            title: "Aula 14 - Impressão 3D",
            videoUrl: "https://www.youtube.com/watch?v=OnVEhO0EPRI&list=PL_bp00zF4EU-Ja2etr8gco4hpySzhCScI&index=14",
            desc: "Do digital para o físico: entenda o processo de manufatura aditiva, como usar fatiadores (slicers) e como criar peças articuladas (print-in-place) direto da impressora.",
            duration: "23m"
        }
    ],

    exercises: [
        {
            id: 1,
            question: "No início da rodada, quanto tempo a equipe tem disponível para calibrar o robô na arena?",
            options: ["30 segundos", "1 minuto", "2 minutos", "5 minutos"],
            correctAnswer: 1
        },
        {
            id: 2,
            question: "Na zona de resgate, qual é o multiplicador de pontuação se você depositar uma vítima viva na área verde?",
            options: ["1.0", "1.1", "1.3", "1.5"],
            correctAnswer: 2
        },
        {
            id: 3,
            question: "Se a marcação verde da intersecção estiver DEPOIS da linha preta, o que o robô deve fazer?",
            options: ["Virar à direita", "Seguir reto (ignorar intersecção)", "Dar meia volta", "Parar"],
            correctAnswer: 1
        },

        // --- AULA 02 ---
        {
            id: 4,
            question: "Qual é a principal função da plataforma Tinkercad apresentada na aula?",
            options: ["Editar vídeos", "Criar jogos estilo console", "Simular circuitos e modelagem 3D", "Desenhar em 2D"],
            correctAnswer: 2
        },
        {
            id: 5,
            question: "Qual ferramenta do Tinkercad permite criar objetos 3D utilizando lógica de programação (blocos)?",
            options: ["Circuitos", "Codeblocks", "Galeria", "Simulação Física"],
            correctAnswer: 1
        },
        {
            id: 6,
            question: "O que acontece na simulação se você ligar um LED diretamente em 9V sem resistor?",
            options: ["Funciona normal", "Ícone de explosão (queima)", "Pisca rápido", "Nada acontece"],
            correctAnswer: 1
        },

        // --- AULA 03 ---
        {
            id: 7,
            question: "Em um projeto de robótica, qual é a função principal do Arduino?",
            options: ["Servir como bateria", "Ser o cérebro (processamento)", "Apenas acender luzes", "Servir como roda"],
            correctAnswer: 1
        },
        {
            id: 8,
            question: "Qual a diferença básica entre pinos Digitais e Analógicos?",
            options: ["Digitais leem 0 ou 1, analógicos leem variação", "Digitais só entrada, analógicos só saída", "São iguais", "Analógicos ligam na tomada"],
            correctAnswer: 0
        },
        {
            id: 9,
            question: "Para que servem os pinos TX e RX na placa Arduino?",
            options: ["Alimentação de energia", "Comunicação serial", "Resetar a placa", "Controlar motores"],
            correctAnswer: 1
        },

        // --- AULA 04 ---
        {
            id: 10,
            question: "Para que serve uma Matriz de Contato (Protoboard)?",
            options: ["Soldar componentes", "Montar circuitos sem solda", "Gerar energia", "Guardar componentes"],
            correctAnswer: 1
        },
        {
            id: 11,
            question: "Como as conexões são organizadas na área central de uma protoboard?",
            options: ["Linhas horizontais", "Colunas verticais de 5 furos", "Sem conexão", "Na diagonal"],
            correctAnswer: 1
        },
        {
            id: 12,
            question: "O que são 'Jumpers'?",
            options: ["Pequenos robôs", "Fios condutores para conexão", "Fontes de alta tensão", "Resistores"],
            correctAnswer: 1
        },

        // --- AULA 05 ---
        {
            id: 13,
            question: "Qual é a função principal de um resistor em um circuito com LED?",
            options: ["Aumentar tensão", "Limitar a corrente elétrica", "Fazer piscar", "Gerar luz"],
            correctAnswer: 1
        },
        {
            id: 14,
            question: "Qual Lei relaciona Tensão (V), Corrente (I) e Resistência (R)?",
            options: ["Lei de Newton", "Lei de Joule", "Lei de Ohm", "Lei de Coulomb"],
            correctAnswer: 2
        },
        {
            id: 15,
            question: "Como chamamos o terminal positivo e o negativo de um LED, respectivamente?",
            options: ["Anodo (+) e Cátodo (-)", "Cátodo (+) e Anodo (-)", "Maior e Menor", "Norte e Sul"],
            correctAnswer: 0
        },

        // --- AULA 06 ---
        {
            id: 16,
            question: "O que acontece se você ligar um LED invertido?",
            options: ["Explode", "Cor diferente", "Não acende", "Acende normal"],
            correctAnswer: 2
        },
        {
            id: 17,
            question: "O que é um Potenciômetro?",
            options: ["Um LED forte", "Um resistor variável ajustável", "Uma bateria", "Um sensor"],
            correctAnswer: 1
        },
        {
            id: 18,
            question: "Resistor: Marrom (1), Preto (0), Vermelho (x100). Qual o valor?",
            options: ["100 Ohms", "1000 Ohms (1k)", "10 Ohms", "220 Ohms"],
            correctAnswer: 1
        },

        // --- AULA 07 ---
        {
            id: 19,
            question: "No projeto do semáforo, quais componentes representam as luzes?",
            options: ["Motores", "LDR", "LEDs", "Buzzers"],
            correctAnswer: 2
        },
        {
            id: 20,
            question: "Qual função do Arduino faz o programa 'esperar' um tempo?",
            options: ["stop()", "wait()", "delay()", "pause()"],
            correctAnswer: 2
        },
        {
            id: 21,
            question: "Por que usar resistor de 'pull-up' em um botão?",
            options: ["Deixar mais brilhante", "Evitar flutuação na leitura", "Aumentar velocidade", "Funcionar sem apertar"],
            correctAnswer: 1
        },

        // --- AULA 08 ---
        {
            id: 22,
            question: "Qual é a função de um sensor em um robô?",
            options: ["Andar rápido", "Perceber o ambiente", "Substituir bateria", "Enfeitar"],
            correctAnswer: 1
        },
        {
            id: 23,
            question: "Como funciona um sensor Ultrassônico?",
            options: ["Tira foto", "Mede temperatura", "Emite som e mede o eco", "Usa laser"],
            correctAnswer: 2
        },
        {
            id: 24,
            question: "Qual a função de um Giroscópio?",
            options: ["Medir velocidade", "Medir orientação/ângulo", "Detectar cores", "Resfriar"],
            correctAnswer: 1
        },

        // --- AULA 09 ---
        {
            id: 25,
            question: "O que é um atuador?",
            options: ["Dispositivo que gera movimento", "Sensor de leitura", "Computador", "Piloto"],
            correctAnswer: 0
        },
        {
            id: 26,
            question: "Qual destes é um exemplo de atuador Pneumático?",
            options: ["Motor DC", "Cilindro de ar comprimido", "Servo motor", "LED"],
            correctAnswer: 1
        },
        {
            id: 27,
            question: "Qual é a ordem correta do fluxo de controle?",
            options: ["Atuador -> Sensor -> Controlador", "Controlador -> Sensor -> Atuador", "Sensor -> Controlador -> Atuador", "Sensor -> Atuador -> Controlador"],
            correctAnswer: 2
        },

        // --- AULA 10 ---
        {
            id: 28,
            question: "Para controlar o robô pelo celular, qual componente usamos?",
            options: ["Módulo Bluetooth", "Outro Arduino", "Antena de TV", "Cabo de 5m"],
            correctAnswer: 0
        },
        {
            id: 29,
            question: "Como ligar os pinos de comunicação TX e RX do Bluetooth no Arduino?",
            options: ["TX no TX e RX no RX", "Cruzado (TX no RX e RX no TX)", "Só positivo e negativo", "Nas portas analógicas"],
            correctAnswer: 1
        },
        {
            id: 30,
            question: "Qual a diferença do HC-06 para o HC-05?",
            options: ["A cor", "HC-06 é só escravo, HC-05 pode ser mestre", "Alcance", "Não serve para Arduino"],
            correctAnswer: 1
        },

        // --- AULA 11 ---
        {
            id: 31,
            question: "Qual é o objetivo de um robô seguidor de linha?",
            options: ["Desviar de paredes", "Seguir uma linha no chão", "Correr em linha reta", "Lutar sumô"],
            correctAnswer: 1
        },
        {
            id: 32,
            question: "Qual sensor é usado para detectar a linha?",
            options: ["Ultrassônico", "Reflectância (Infravermelho)", "Temperatura", "Microfone"],
            correctAnswer: 1
        },
        {
            id: 33,
            question: "Para controlar a velocidade dos motores, usamos:",
            options: ["GPS", "PWM", "High Voltage", "Overclock"],
            correctAnswer: 1
        },

        // --- AULA 12 ---
        {
            id: 34,
            question: "Além de seguir linha, qual a missão do robô de resgate?",
            options: ["Destruir oponente", "Resgatar vítimas", "Voar", "Sair do labirinto"],
            correctAnswer: 1
        },
        {
            id: 35,
            question: "Quanto tempo dura uma rodada oficial da OBR?",
            options: ["10 minutos", "2 minutos", "5 minutos", "1 hora"],
            correctAnswer: 2
        },
        {
            id: 36,
            question: "O que é o 'GAP' na pista?",
            options: ["Buraco", "Falha na linha (espaço vazio)", "Vítima", "Chegada"],
            correctAnswer: 1
        },

        // --- AULA 13 ---
        {
            id: 37,
            question: "Qual componente é a 'Roda Boba'?",
            options: ["Roda quebrada", "Roda livre de apoio", "Roda com motor", "Volante"],
            correctAnswer: 1
        },
        {
            id: 38,
            question: "O que acontece se inverter a polaridade de um Motor DC?",
            options: ["Queima", "Para", "Gira ao contrário", "Acelera"],
            correctAnswer: 2
        },
        {
            id: 39,
            question: "Por que manter o centro de massa baixo?",
            options: ["Beleza", "Estabilidade", "Economia", "Não importa"],
            correctAnswer: 1
        },

        // --- AULA 14 ---
        {
            id: 40,
            question: "Qual a matéria-prima comum na impressão 3D (filamento)?",
            options: ["Papel", "Plástico (PLA)", "Ferro", "Madeira"],
            correctAnswer: 1
        },
        {
            id: 41,
            question: "O que o 'Fatiador' (Slicer) faz?",
            options: ["Formata PC", "Transforma modelo em camadas para a impressora", "Tira foto", "Pinta"],
            correctAnswer: 1
        },
        {
            id: 42,
            question: "Como o gatinho já saiu articulado da impressora?",
            options: ["Borracha", "Print-in-place (folgas planejadas)", "Montado depois", "Quebrado"],
            correctAnswer: 1
        }
    ]
}