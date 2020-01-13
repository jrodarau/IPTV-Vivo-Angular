import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listfilms',
  templateUrl: './listfilms.component.html',
  styleUrls: ['./listfilms.component.scss']
})
export class ListfilmsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(function () {
      // INICIO sistema movimentacao
      $(document).keydown((e) => {
        var focoEm = parseInt($('#focoEm').val().toString());
        switch (e.which) {
          case 13: // Press Enter
            showInfo(focoEm);
            break;
          case 37: // Arrow Left
            if (removeFoco(focoEm)) {
              focoEm -= 1;
              if (!addFoco(focoEm)) {
                focoEm += 1;
                addFoco(focoEm);
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
            if (removeFoco(focoEm)) {
              focoEm += 1;
              if (!addFoco(focoEm)) {
                focoEm -= 1;
                addFoco(focoEm);
              }
            }
            break;
          case 40: // Arrow Bottom
            if (removeFoco(focoEm)) {
              if(focoEm==-2){
                focoEm=-1;
              }else{
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

      var inputCampo = $("#search");
      inputCampo.keyup(() => {
        var q = inputCampo.val();
        var focoEm = parseInt($('#focoEm').val().toString());
        if(focoEm == -3) {
          $('#focoEm').val(-2);
          $("#answer").empty();
          loadFilms(nomeSugerido, nadaEncontrado);
          return;
        }
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
      var linkNotice = $('#linkFilme' + focarEm);
      var goToPage = linkNotice.attr('href');
      window.location.href = goToPage;
    }
    function addFoco(focarEm) {
      if (focarEm < 0) {
        var navFocar = $("#search").focus();
        $('#focoEm').val(-3);
        $("#answer").empty();
        $('html,body').animate({ scrollTop: 0 }, 'slow');
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
      $('#filme' + desfocarEm).removeClass('focoFilme');
      return true;
    }
    function loadFilms(q, nadaEncontrado) {
      var data;
      $('#focoEm').val(-1);
      $.get("https://www.omdbapi.com/?s=" + q + "&apikey=4dd797fc", function (rawdata) {
        var rawstring = JSON.stringify(rawdata);
        data = JSON.parse(rawstring);
        if (data.Search == null) {
          nadaEncontrado.empty();
          nadaEncontrado.append("<h3>Nada encontrado!</h3>");
          $("#answer").empty();
          return;
        }

        nadaEncontrado.empty();
        for (var i = 0; i < data.Search.length; i++) {

          var title = data.Search[i].Title;
          var imdburl = "https://www.imdb.com/title/" + data.Search[i].imdbID + "/";
          var posterurl = data.Search[i].Poster;
          if (posterurl === "N/A") {
            posterurl = "https://i.imgur.com/le3OlNV.jpg";
          }
          var year = data.Search[i].Year;
          var html = '';
          html += '<div class="row col s12 l3 m6 center container">';
          html += '<div >';
          html += '<div id="filme' + i + '" class="card large" style="text-transform: uppercase;">';
          html += '<div class="card-image">';
          html += '<img src="' + posterurl + '">';
          html += '<span class="card-title black-text">' + title + '</span>';
          html += '</div>';
          html += '<div class="card-content">';
          html += '<p> Transmissão: ' + year + '</p>';
          html += '</div>';
          html += '<div class="card-action">';
          html += '<a href="#modal1" class=" center waves-effect waves-light btn modal-trigger blue">Acessar IMDB</a>';
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


