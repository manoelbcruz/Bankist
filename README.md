# 🏦 Bankist - Sistema Bancário Simplificado

Bankist é uma aplicação de internet banking simulada, desenvolvida para aprimorar e demonstrar habilidades avançadas em JavaScript. O projeto foca na manipulação de dados, manipulação do DOM e na implementação de funcionalidades bancárias essenciais, como login, transferências, empréstimos e encerramento de conta.

![Demonstração do Bankist](aqui_voce_coloca_o_link_do_seu_gif.gif)

## ✨ Funcionalidades

A aplicação permite que um usuário realize as seguintes ações após o login:

-   **Autenticação de Usuário:** Sistema de login funcional com usuário e PIN.
-   **Visualização de Saldo:** Exibição em tempo real do saldo atual da conta.
-   **Extrato de Transações:** Lista detalhada de depósitos e saques, com datas formatadas.
-   **Transferência de Dinheiro:** Envio de valores para outras contas de usuário existentes.
-   **Solicitação de Empréstimo:** O usuário pode solicitar um empréstimo, que é concedido com base em uma regra de negócio (ex: o valor do empréstimo deve ser menor que 10% do valor total já depositado).
-   **Encerramento de Conta:** O usuário pode fechar sua conta permanentemente após confirmar suas credenciais.
-   **Ordenação de Transações:** Funcionalidade para ordenar o extrato em ordem crescente ou decrescente.
-   **Cálculo de Resumos:** Exibição automática do total de entradas, saídas e juros calculados.
-   **Timer de Logout:** O usuário é desconectado automaticamente após um período de inatividade para garantir a segurança.

## 🛠️ Tecnologias Utilizadas

-   **HTML5:** Estrutura semântica para a interface da aplicação.
-   **CSS3:** Estilização completa para criar um layout moderno e responsivo.
-   **JavaScript:** Toda a lógica da aplicação, desde a autenticação até a manipulação dos dados das contas.

## 🧠 Aprendizados e Conceitos Praticados

Este projeto foi uma imersão profunda em conceitos cruciais de JavaScript, especialmente no que diz respeito ao trabalho com arrays e dados:

-   **Métodos Avançados de Arrays:** Uso intensivo de métodos como:
    -   `forEach` para exibir os elementos na interface.
    -   `map`, `filter` e `reduce` para realizar cálculos complexos, como o cálculo de resumos (entradas, saídas, juros).
    -   `find` e `findIndex` para localizar contas de usuário durante o login, transferências e encerramento de conta.
    -   `sort` para implementar a funcionalidade de ordenação do extrato.
-   **Manipulação de Números e Datas:** Formatação de moedas e datas para uma exibição mais amigável, utilizando a `Intl API` (Internationalization API).
-   **Manipulação do DOM:** Criação, inserção e atualização dinâmica de elementos HTML para refletir o estado da aplicação em tempo real (ex: adicionar uma nova transação à lista).
-   **Gerenciamento de Estado:** Controle do estado da aplicação, como qual usuário está logado, seus dados e transações, através de objetos e arrays.
-   **Timers e Eventos:** Implementação do timer de logout com `setInterval` e `setTimeout`, e gerenciamento de múltiplos `event listeners` para todas as funcionalidades interativas.
-   **Lógica de Negócio:** Aplicação de regras de negócio para validar transferências (saldo suficiente, conta existente), conceder empréstimos e encerrar contas.
