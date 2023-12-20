const StreamerOptions = () => {
    return (
    <section className="OptionsContainer">
        <h2 style={{fontSize:"1.5rem"}}>STREAMER</h2>
                <div className="Option">
                    <h3>Usar recompensa limitada diaria</h3>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='daily' id='dailycheck'/>
                        <label className="switch" htmlFor="daily">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="daily_points">Puntos necesarios:</label>
                    <input type="text" name="daily_points"/>
                </div>
                <div className="Option">
                    <h3>Usar recompensa por stream</h3>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='per_stream' id='perstream'/>
                        <label className="switch" htmlFor="pers_tream">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="per_stream_points">Puntos necesarios:</label>
                    <input type="text" name="per_stream_points"/>
                </div>
            </section>
    )
}
export { StreamerOptions }