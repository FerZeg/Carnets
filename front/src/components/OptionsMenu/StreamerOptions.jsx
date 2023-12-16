const StreamerOptions = () => {
    return (
    <section className="OptionsContainer">
                <div className="Option">
                    <h2>Usar recompensa limitada diaria</h2>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='daily' id='dailycheck'/>
                        <label className="switch" htmlFor="dailycheck">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="Puntos">Puntos necesarios:</label>
                    <input type="text" name="Puntos"/>
                </div>
                <div className="Option">
                    <h2>Usar recompensa por stream</h2>
                    <div className="SwitchContainer">
                        <input type="checkbox" className="checkbox" name='perstream' id='perstream'/>
                        <label className="switch" htmlFor="perstream">
                            <span className="slider"></span>
                        </label>
                    </div>
                    <label htmlFor="Puntos">Puntos necesarios:</label>
                    <input type="text" name="Puntos"/>
                </div>
            </section>
    )
}
export { StreamerOptions }