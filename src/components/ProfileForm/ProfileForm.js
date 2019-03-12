import React from 'react';
import Input from '../Input/Input';

class ProfileForm extends React.Component {
  render() {
    return (
      <div className='p-15 p-bottom-0'>
        <div className='grid'>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Nome:'
              name='nome'
              hasError={!this.props.nome}
              onChange={this.props.onChangeHandler}
              value={this.props.nome}
              placeholder='Digite seu nome'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Sobrenome:'
              name='sobrenome'
              hasError={!this.props.sobrenome}
              onChange={this.props.onChangeHandler}
              value={this.props.sobrenome}
              placeholder='Digite seu sobrenome'
            />
          </div>

          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Cidade:'
              name='cidade'
              hasError={!this.props.cidade}
              onChange={this.props.onChangeHandler}
              value={this.props.cidade}
              placeholder='Digite sua cidade'
            />
          </div>
          <div className='sm-3-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Telefone:'
              name='telefone'
              mask={
                this.props.telefone &&
                this.props.telefone.replace(/\D/g, '').length <= 10
                  ? '(99) 9999-9999?'
                  : '(99) 99999-9999'
              }
              formatChars={{ 9: '[0-9]', '?': '[0-9]' }}
              onChange={this.props.onChangeHandler}
              value={this.props.telefone}
              placeholder='Digite seu telefone'
            />
          </div>
          <div className='sm-3-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Nascimentos:'
              mask='99/99/9999'
              name='nascimento'
              errorMessage='Digite uma data válida. (ex. 10/01/1980)'
              hasError={this.props.nascimento.replace(/\D/g, '').length !== 8}
              onChange={this.props.onChangeHandler}
              value={this.props.nascimento}
              placeholder='Digite seu nascimento'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Telefone de Emergência:'
              mask={
                this.props.numeroDeEmergencia &&
                this.props.numeroDeEmergencia.replace(/\D/g, '').length <= 10
                  ? '(99) 9999-9999?'
                  : '(99) 99999-9999'
              }
              formatChars={{ 9: '[0-9]', '?': '[0-9]' }}
              name='numeroDeEmergencia'
              onChange={this.props.onChangeHandler}
              hasError={!this.props.numeroDeEmergencia}
              value={this.props.numeroDeEmergencia}
              placeholder='Digite um telefone de emergência'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll || !this.props.isDisabled}
              label='Nome do contato de emergência:'
              name='nomeDeEmergencia'
              onChange={this.props.onChangeHandler}
              hasError={!this.props.nomeDeEmergencia}
              value={this.props.nomeDeEmergencia}
              placeholder='Digite o nome do contato de emergência'
            />
          </div>
          {!this.props.hideDetails && (
            <div className='sm-6-12'>
              <div className='m-bottom-30'>
                <label className='label d-block'>É lider?</label>
                <select
                  value={this.props.lider}
                  onChange={this.props.onChangeHandler}
                  name='lider'
                  disabled={this.props.disabledAll || !this.props.isDisabled}
                >
                  <option value={false}>Não</option>
                  <option value={true}>Sim</option>
                </select>
              </div>
            </div>
          )}
          {!this.props.hideDetails &&
            this.props.rotas &&
            this.props.rotas.length > 0 && (
              <div className='sm-6-12'>
                <div className='m-bottom-30'>
                  <label className='label d-block'>Rota padrão</label>
                  <select
                    value={this.props.rotaDefault}
                    onChange={this.props.onChangeHandler}
                    name='rotaDefault'
                    disabled={this.props.disabledAll || !this.props.isDisabled}
                  >
                    <option />
                    {this.props.rotas.map(({ rota, _id }) => {
                      return (
                        <option key={_id} value={rota}>
                          {rota}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default ProfileForm;
