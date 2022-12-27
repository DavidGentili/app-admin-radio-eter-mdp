import { CompositeDecorator } from "draft-js";

const HANDLE_REGEX = /\@[\w]+/g;

//STRATEGIES

const handleStategy = (contentBlock, callback, contentState) => {
    findwithRegex(HANDLE_REGEX, contentBlock, callback);
}


//COMPONENTS

const HandledComponent = (props) => {
    return (
        <span style={{color : 'blue'}} data-offset-key={props.offsetKey}>
            {props.children}
        </span>
    )
}



const findwithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start;
    while((matchArr = regex.exec(text)) !== null){
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export const compositeDecorator = new CompositeDecorator([
    {
        strategy : handleStategy,
        component : HandledComponent,

    }
])