import React from 'react';
import Input from '../Input/Input';

class ProfileForm extends React.Component {
  render() {
    return (
      <div className='p-15 p-bottom-0'>
        <div className='grid'>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Nome:'
              name='nome'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.nome}
              placeholder='Digite seu nome'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Sobrenome:'
              name='sobrenome'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.sobrenome}
              placeholder='Digite seu sobrenome'
            />
          </div>

          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Cidade:'
              name='cidade'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.cidade}
              placeholder='Digite sua cidade'
            />
          </div>
          <div className='sm-3-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Telefone:'
              name='telefone'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.telefone}
              placeholder='Digite seu telefone'
            />
          </div>
          <div className='sm-3-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Nascimento:'
              name='nascimento'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.nascimento}
              placeholder='Digite seu nascimento'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Telefone de Emergência:'
              name='numeroDeEmergencia'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.numeroDeEmergencia}
              placeholder='Digite um telefone de emergência'
            />
          </div>
          <div className='sm-6-12'>
            <Input
              disabled={this.props.disabledAll}
              label='Nome do contato de emergência:'
              name='nomeDeEmergencia'
              disabled={!this.props.isDisabled}
              onChange={this.props.onChangeHandler}
              value={this.props.nomeDeEmergencia}
              placeholder='Digite o nome do contato de emergência'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
