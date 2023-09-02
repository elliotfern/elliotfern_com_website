

function Footer() {

    // textos
    const titolPB = "We release the contents to the Public Domain";
    const PBurl = "https://creativecommons.org/publicdomain/zero/1.0/deed.en";
    const textPB = "All the contents of this web page are published and sent to the public domain by renouncing all rights to the work in relation to intellectual property, including related rights, as far as it is possible with the applicable law applicable. You can copy, modify, distribute the work and make public communication, even for commercial purposes, without asking for any kind of permission.";
    const textAbout = "Open History is an independent publishing project that offers readers free access history courses.";
    const date = new Date();
    const year = date.getFullYear();
    const webPath = "";

    return (
        <>
            <div className="container-fluid footer">
                <div className="footer-elliotfern">
                    <div className="menu-separacio">
                        <a href="">About me</a>
                    </div>

                    <div className="menu-separacio">
                        <a href="">Privacy policy</a>
                    </div>

                    <div className="menu-separacio">
                        <a href="">Contact</a>
                    </div>
                </div>

                <hr />

                <div id="footer-elliotfern-petit">
                    <a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en" aria-label="Creative Commons" target='_blank' rel='noopener' title="Creative commons"><img className="mx-auto d-block" src="https://elliotfern.com/img/elliotfern-icon/domini-public.gif" alt="Public Domain" title='Public Domain' width='88' height='31' /></a>

                    <div className="text-footer">{textPB}</div>

                    <div className="text-footer">Elliot Fernandez (2002 - {year})</div>
                </div>

            </div>

        </>
    )
}

export default Footer