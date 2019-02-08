# GAS Dashboard

## Estrutura

assets //Images
components //Componentes React
pages //Páginas do app
redux //Store do app
services //Funções p/ requisições
style //CSS
utils //Funções úteis

## Padrões:

Páginas, Components - Capital case
Funções - Snakecase

## Redux:

Padrão Ducks, onde tudo relacionado a um pedaço da Store, fica num mesmo arquivo. Ex. Types, Reducer, Actions

## CSS

Pré Processador SCSS utilizado. Classes globais, reutilizáveis e abreviadas.

### Padding:

.p-X, .p-top-X, .p-bottom-X, .p-left-X, .p-right-X [X pode ser 5, 10, 15, 20, 30, 40, 50, 60].

### Margin:

.m-X, .m-top-X, .m-bottom-X, .m-left-X, .m-right-X [X pode ser 5, 10, 15, 20, 30, 40, 50, 60].

### Text-Align:

.p-left, .p-center, .p-right - Alinhamento de textos (text-align: left | center | right).

### Flex

.d-flex, .d-flex-space-between, .d-flex-space-around, .d-flex-column, .d-flex-row, .d-flex-end, .d-flex-align-center, .d-flex-align-end, .d-flex-wrap
(display: flex, justify-content: space-between | space-around, flex-direction: column | row, align-items: center | end)

### Grids

Feito com flexbox. Classes parecidas com o Bootstrap.
.grid, .xs-4-12, .sm-4-12, .md-4-12, .lg-4-12.

### Font-weight:

.fw-300, .fw-600, .fw-bold, .fw-lighter
.font-weight: 300 | 600 | bold | lighter.
