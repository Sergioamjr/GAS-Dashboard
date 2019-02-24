import React from 'react';
import Input from '../Input/Input';
import Checkbox from '../Checkbox/Checkbox';

class ActionInfo extends React.Component {
  render() {
    return (
      <div className='p-15 p-bottom-0'>
        <div className='grid'>
          {!this.props.hideFirstTime && (
            <div className='sm-3-12'>
              <label htmlFor='first_time' className='label d-block m-bottom-60'>
                Será sua primeira vez no GAS?
              </label>
              <div className='m-top-10 m-bottom-10'>
                <Checkbox
                  label='Sim'
                  name='first_time'
                  onChange={this.props.onChangeHandler}
                  checked={this.props.first_time}
                />
              </div>
            </div>
          )}
          <div
            className={` ${!this.props.hideFirstTime ? 'sm-3-12' : 'sm-6-12'} `}
          >
            <label htmlFor='withCar' className='label d-block m-bottom-60'>
              Você irá de carro?
            </label>
            <div className='m-top-10 m-bottom-10'>
              <Checkbox
                label='Sim'
                name='withCar'
                onChange={e => this.props.onChangeHandler(e, { carModel: '' })}
                checked={this.props.withCar}
              />
            </div>
          </div>

          <div className='sm-6-12'>
            <Input
              disabled={!this.props.withCar}
              label='Modelo do carro:'
              name='carModel'
              onChange={this.props.onChangeHandler}
              value={this.props.carModel}
              placeholder='Digite o modelo do seu carro'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ActionInfo;
