import { Component, OnInit} from '@angular/core';
import { ApiOnibus } from 'src/app/onibus.service';
import { ApiLotacao } from 'src/app/lotacao.service';
import { Linha } from 'src/model/linha';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoadingResults = true;
  linhasOnibus: Array<Linha>;
  linhasLotacao: Array<Linha>;
  itinerarios: Array<Object> = [];
  linhaselecionada = {};
  pesquisaOnibus: any = { nome: '' };
  pesquisaLotacao: any = { nome: '' };

  constructor(private _apiOnibus: ApiOnibus, private _apiLotacao: ApiLotacao, private toastr: ToastrService) { }

  isNumeric(valor: any) {
    return !isNaN(valor - parseFloat(valor));
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Mensagem');
  }

  showError(message: string) {
    this.toastr.error(message, 'Erro');
  }

  selecionarLinha (linha: Linha) {
    this.linhaselecionada = {
      'nome' : linha.nome,
      'codigo' : linha.codigo,
      'id' : linha.id
    };
  }

  getItinerarios(linha: Linha) {
    const id = linha.id;
    this._apiOnibus.getItinerario(id).subscribe(res => {

      this.linhaselecionada = {'nome': res.nome};

      const chaves = Object.keys(res);
      let itinerarios = [];

      chaves.forEach((chave) => {
        if (this.isNumeric(chave)) {
            itinerarios.push(res[chave]);
        }
      });

      const mensagem  = `Itinerário da linha ${linha.nome} listado com sucesso`;
      this.showSuccess(mensagem);

      this.itinerarios = itinerarios;
      this.selecionarLinha(linha);

    }, err => {

      const mensagem  = `Ocorreu um erro ao buscar o Itinerário da linha ${linha.nome}`;
      this.showError(mensagem);

      console.log(err);
    });
  }

  getLinhasOnibus() {
    this._apiOnibus.getLinhas()
    .subscribe(res => {

      this.linhasOnibus = res;
      this.isLoadingResults = false;

      const mensagem  = 'Ônibus listados com sucesso';
      this.showSuccess(mensagem);

    }, err => {
      console.log(err);
      const mensagem  = `Ocorreu um erro ao buscar a lista de ônibus`;
      this.showError(mensagem);

      this.isLoadingResults = false;
    });
  }

  getLinhasLotacao() {
    this._apiLotacao.getLinhas()
    .subscribe(res => {
      this.linhasLotacao = res;
      this.isLoadingResults = false;

      const mensagem  = 'Lotações listadas com sucesso';
      this.showSuccess(mensagem);

    }, err => {
      console.log(err);
      const mensagem  = `Ocorreu um erro ao buscar a lista de lotações`;
      this.showError(mensagem);
      this.isLoadingResults = false;
    });
  }

  ngOnInit() {

    this.getLinhasOnibus();
    this.getLinhasLotacao();

  }
}
