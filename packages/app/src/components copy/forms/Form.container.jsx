import React from "react";
import tachyons from "tachyons";

const Form = ({ children }) => {
    return (
        <article className="br3 ba bg-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center transparent">
            <main className="pa4 white">
                <div className="measure">{children}</div>
            </main>
        </article>
    );
};

export default Form;
