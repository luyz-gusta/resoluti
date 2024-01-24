/**************************************************************************************
 *  Goal: Button(Remover, Adicionar, Salvar)
 *  Author: Luiz Gustavo
 *  Date: 20/01/2023
 *  Version: 1.0
 **************************************************************************************/

const ButtonForm = ({txt, onclick}) => {
    return (
        <button onClick={onclick} type="button" className="btn-form">{txt}</button>
    );
};

export default ButtonForm;
