import { Link } from "react-router-dom";

const About = () : JSX.Element => {
    return (
        <main>
            <section className="section">
            <div className="container">
            <div className="columns is-vcentered">
                <div className="column is-3">
                    <h1 className="is-size-1 title">WoWs Shipfinder</h1>
                    <p>
                        Welcome to the World of Warships Shipfinder. This site provides tools to look at ships from multiple nations and classes to learn interesting info about them.
                        You can see a picture of the ship, its name, nation, tier, class, and its description. Head over to the <Link to={"ships"}>Ships page</Link> to check it out!
                    </p>
                    <hr />
                    <p>
                        Contact: tmb3614@rit.edu
                    </p>
                </div>
                <div className="column is-5 has-text-centered">
                    <img src="./wows-icon.png" className="px-6" />
                </div>
            </div>
            </div>
        </section>
        </main>
    );
}

export default About;