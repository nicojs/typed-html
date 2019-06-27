declare namespace JSX {
    interface CustomElement {
        ACustomAttr: string;
        customLIAttr: string;
    }

    interface IntrinsicElements {
        customElement: CustomElement;
    }
}