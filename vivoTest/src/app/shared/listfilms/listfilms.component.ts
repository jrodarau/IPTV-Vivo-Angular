import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-listfilms',
    templateUrl: './listfilms.component.html',
})
export class ListfilmsComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        $(document).ready(function () {
            var inputCampo = $("#search");
            // INICIO sistema movimentacao
            $(document).keydown((e) => {
                var focoEm = parseInt($('#focoEm').val().toString());
                switch (e.which) {
                    case 13: // Press Enter
                        showInfo(focoEm);
                        // alert("Foco em: " + focoEm);
                        break;
                    case 37: // Arrow Left
                        var q = inputCampo.val();
                        if ((q == null || q === "")) {
                            if (removeFoco(focoEm)) {
                                focoEm -= 1;
                                if (!addFoco(focoEm)) {
                                    focoEm += 1;
                                    addFoco(focoEm);
                                }
                            }
                        } else if (focoEm > 0) {
                            if (removeFoco(focoEm)) {
                                focoEm -= 1;
                                if (!addFoco(focoEm)) {
                                    focoEm += 1;
                                    addFoco(focoEm);
                                }
                            }
                        }
                        break;
                    case 38: // Arrow Up
                        if (removeFoco(focoEm)) {
                            focoEm -= 4;
                            if (!addFoco(focoEm)) {
                                focoEm += 4;
                                addFoco(focoEm);
                            }
                        }
                        break;
                    case 39: // Arrow Right
                        var q = inputCampo.val();
                        if ((q == null || q === "")) {
                            if (removeFoco(focoEm)) {
                                focoEm += 1;
                                if (!addFoco(focoEm)) {
                                    focoEm -= 1;
                                    addFoco(focoEm);
                                }
                            }
                        } else if (focoEm > 0) {
                            if (removeFoco(focoEm)) {
                                focoEm += 1;
                                if (!addFoco(focoEm)) {
                                    focoEm -= 1;
                                    addFoco(focoEm);
                                }
                            }
                        }
                        break;
                    case 40: // Arrow Down
                        if (removeFoco(focoEm)) {
                            if(focoEm==0){
                                focoEm = 1;
                            }else if (focoEm == -2) {
                                focoEm = -1;
                            } else {
                                focoEm += 4;
                            }
                            if (!addFoco(focoEm)) {
                                focoEm -= 4;
                                addFoco(focoEm);
                            }
                        }
                        break;
                }
            });


            // FIM sistema movimentacao
            // INICIO sistema load films
            var nomes = [
                {
                    nome: 'Batman'
                },
                {
                    nome: 'Avatar'
                },
                {
                    nome: 'Spider man'
                },
                {
                    nome: 'Hulk'
                },
                {
                    nome: 'Avengers'
                },
            ];
            var nomeSugerido = nomes[Math.floor(Math.random() * nomes.length)].nome;
            var nadaEncontrado = $("#nadaEncontrado");

            loadFilms(nomeSugerido, nadaEncontrado);

            inputCampo.keyup(() => {
                var focoEm = parseInt($('#focoEm').val().toString());
                var q = inputCampo.val();
                if (q == null || q === "") {
                    nadaEncontrado.empty();
                    $("#answer").empty();
                    loadFilms(nomeSugerido, nadaEncontrado);
                    return;
                }
                loadFilms(q, nadaEncontrado);
            });
        });
        function showInfo(focarEm) {
            if (focarEm <= 0) {
                return;
            }
            if ($('#modal').hasClass('open')) {
                $('#modal').modal('close');
                $("#modal").empty();
                return;
            }
            var infoFilme = $('#infoFilme' + focarEm);
            var imdbID = infoFilme.val();
            $.get("https://www.omdbapi.com/?i=" + imdbID + "&apikey=4dd797fc", (data) => {
                var produtora = data.Production;

                if (typeof (produtora) === 'undefined' || produtora === 'N/A') {
                    produtora = 'Não informado'
                }

                var html = '';
                html += '<div class="modal-content">';
                html += '<div class="row">';
                html += '<div class="col s12 l3 m12">';
                html += '<center>';
                html += '<img src="' + data.Poster + '" class="responsive-img">';
                html += '</center>';
                html += '</div>';
                html += '<div class = "col s12 l9 m12 >';
                html += '<h4 class="titleModal center" style= "font-family:Anton;  >' + data.Title + '</h4>';
                html += '<p style= "font-family:Anton";>Sinopse: ' + data.Plot + '</p>'
                html += '<p style= "font-family:Anton";> Genêro: ' + data.Genre + '</p>'
                html += '<p style= "font-family:Anton";> Lançamento: ' + data.Released + '</p>'
                html += '<p style= "font-family:Anton";> Avaliação Geral: ' + data.imdbRating + '</p>'
                html += '<p style= "font-family:Anton";> Produtora: ' + produtora + '</p>'
                html += '</div>'
                html += '</div>';
                html += '</div>';
                $("#modal").append(html);
                $("#modal").modal();
            });


        }
        function addFoco(focarEm) {
            if (focarEm <= 0) {
                var navFocar = $("#search").focus();
                $('#focoEm').val(-3);
                // $("#answer").empty();
                if (focarEm != -3) {
                    $('html,body').animate({ scrollTop: 0 }, 'slow');
                }
                return true;
            }
            $("#search").blur();
            var filmeFocar = $('#filme' + focarEm);
            if (filmeFocar == null || filmeFocar.length == 0) return false;
            filmeFocar.addClass('focoFilme');
            $('#focoEm').val(focarEm);
            $('html,body').animate({ scrollTop: $(filmeFocar).offset().top - 100 }, 'fast');
            return true;
        }
        function removeFoco(desfocarEm) {
            if (desfocarEm == -3 || desfocarEm == -2) return true;
            $('#filme' + desfocarEm).removeClass('focoFilme');
            return true;
        }
        function loadFilms(q, nadaEncontrado) {
            var data;
            var focoEm = $("#focoEm");
            if(parseInt(focoEm.val())<0) {
                $("#answer").empty();
            }
            focoEm.val(0);
            $.get("https://www.omdbapi.com/?s=" + q + "&apikey=4dd797fc", function (rawdata) {
                var rawstring = JSON.stringify(rawdata);
                data = JSON.parse(rawstring);
                if (data.Search == null) {
                    nadaEncontrado.empty();
                    nadaEncontrado.append("<h3>Nada encontrado!</h3>");
                    $("#focoEm").val("-3");
                    $("#answer").empty();
                    return;
                }

                nadaEncontrado.empty();
                /*
                Count indica o id de um filme
                Atraves do Count, movimentaremos a sombra e buscaremos o imdbID para apresentar os detalhes do 
                filme (Ao apertar Enter, exibira os detalhse do filme em que o Count estiver apontado) em um modal.
                */
                var count = 0;
                for (var i = 0; i < data.Search.length; i++) {
                    count++;
                    var title = data.Search[i].Title;
                    var imdbID = data.Search[i].imdbID;
                    var imdburl = "https://www.imdb.com/title/" + imdbID + "/";
                    var posterurl = data.Search[i].Poster;
                    // CASO PRECISAR EXIBIR TITULOS SEM POSTER
                    // if (posterurl === "N/A") {
                    //   posterurl = "https://i.imgur.com/le3OlNV.jpg";
                    // }

                    if (posterurl === "N/A") {
                        count--;
                        continue;
                    }

                    var html = '';
                    html += '<div class="row col s12 l3 m6 ">';
                    html += '<div>';
                    html += '<div id="filme' + count + '" class="card large " href="modal" style="text-transform: uppercase;">';
                    html += '<input type="hidden" id="infoFilme' + count + '" value="' + imdbID + '">'
                    html += '<div class="card-image">';
                    html += '<img src="' + posterurl + '">';
                    html += '<span class="card-title black-text ">' + title + '</span>';
                    html += '</div>';
                    html += '<div class="card-content">';
                    html += '<p class = "center p white-text"> Ano de lançamento: ' + data.Search[i].Year + '</p>';
                    html += '<p class = "center p white-text"> Tipo: ' + data.Search[i].Type + '</p>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                    html += '';
                    $("#answer").append(html);
                }

            });
        }
        // FIM sistema load films
    }



}


