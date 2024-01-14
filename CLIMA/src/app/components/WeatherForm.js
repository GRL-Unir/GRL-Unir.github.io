import React from 'react';


const WeatherForm = props => (
    <div className="card card-body">
        <form onSubmit={props.getWeather} className="form-inline justify-content-center">
            <div className="form-group">
                <input type="text" name="city" placeholder="Nombre de la ciudad" className="form-control mr-2" autoFocus />
                <input type="text" name="country" placeholder="Nombre del pais" className="form-control mr-2" />
            </div>
            <div className="form-group d-flex justify-content-between" style={{ width: '100%' }}>
                <button type="submit" className="btn btn-success flex-fill mr-2">
                    Ver el tiempo
                </button>
                <button type="button" onClick={props.getWeatherByLocation} className="btn btn-primary flex-fill">
                    Obtener clima por ubicación
                </button>
            </div>
        </form>
    </div>
);

export default WeatherForm;