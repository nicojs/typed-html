declare namespace JSX {

    // Source: https://dev.w3.org/html5/html-author/#the-elements

    interface HtmlElement {
        accesskey?: string;
        class?: string;
        contenteditable?: string;
        dir?: string;
        hidden?: string;
        id?: string;
        lang?: string;
        spellcheck?: string;
        style?: string;
        tabindex?: string;
        title?: string;
        translate?: string;
    }

    interface HtmlAnchorElement extends HtmlElement {
        href?: string;
        target?: string;
        download?: string;
        ping?: string;
        rel?: string;
        media?: string;
        hreflang?: string;
        type?: string;
    }


    interface HtmlAreaElement extends HtmlElement {
        alt?: string;
        coords?: string;
        shape?: string;
        href?: string;
        target?: string;
        ping?: string;
        rel?: string;
        media?: string;
        hreflang?: string;
        type?: string;
    }

    interface HtmlAudioElement extends HtmlElement {
        src?: string;
        autobuffer?: string;
        autoplay?: string;
        loop?: string;
        controls?: string;
    }

    interface BaseElement extends HtmlElement {
        href?: string;
        target?: string;
    }
    interface HtmlQuoteElement extends HtmlElement {
        cite?: string;
    }

    interface HtmlBodyElement extends HtmlElement {
    }

    interface HtmlButtonElement extends HtmlElement {
        action?: string;
        autofocus?: string;
        disabled?: string;
        enctype?: string;
        form?: string;
        method?: string;
        name?: string;
        novalidate?: string;
        target?: string;
        type?: string;
        value?: string;
    }

    interface HtmlDataListElement extends HtmlElement {
    }

    interface HtmlCanvasElement extends HtmlElement {
        width?: string;
        height?: string;
    }

    interface HtmlTableColElement extends HtmlElement {
        span?: string;
    }

    interface HtmlTableSectionElement extends HtmlElement {
    }

    interface HtmlTableRowElement extends HtmlElement {
    }

    interface DataElement extends HtmlElement {
        value?: string;
    }
    interface HtmlEmbedElement extends HtmlElement {
        src?: string; type?: string; width?: string; height?: string;
        [anything: string]: string | undefined;
    }

    interface HtmlFieldSetElement extends HtmlElement {
        disabled?: string;
        form?: string;
        name?: string;
    }

    interface HtmlFormElement extends HtmlElement {
        acceptCharset?: string;
        action?: string; autocomplete?: string; enctype?: string; method?: string; name?: string; novalidate?: string; target?: string;
    }

    interface HtmlHtmlElement extends HtmlElement {
        manifest?: string;
    }

    interface HtmlIFrameElement extends HtmlElement {
        src?: string; srcdoc?: string; name?: string; sandbox?: string; seamless?: string; width?: string; height?: string;
    }

    interface HtmlImageElement extends HtmlElement {
        alt?: string; src?: string; crossorigin?: string; usemap?: string; ismap?: string; width?: string; height?: string;
    }

    interface HtmlInputElement extends HtmlElement {
        accept?: string;
        action?: string;
        alt?: string;
        autocomplete?: string;
        autofocus?: string;
        checked?: string;
        disabled?: string;
        enctype?: string;
        form?: string;
        height?: string;
        list?: string;
        max?: string;
        maxlength?: string;
        method?: string;
        min?: string;
        multiple?: string;
        name?: string;
        novalidate?: string;
        pattern?: string;
        placeholder?: string;
        readonly?: string;
        required?: string;
        size?: string;
        src?: string;
        step?: string;
        target?: string;
        type?: string;
        value?: string;
        width?: string;
    }

    interface HtmlModElement extends HtmlElement {
        cite?: string;
        datetime?: string | Date;
    }

    interface KeygenElement extends HtmlElement {
        autofocus?: string; challenge?: string; disabled?: string; form?: string; keytype?: string; name?: string;
    }

    interface HtmlLabelElement extends HtmlElement {
        form?: string; for?: string;
    }

    interface HtmlLIElement extends HtmlElement {
        value?: string | number;
    }

    interface HtmlLinkElement extends HtmlElement {
        href?: string; crossorigin?: string; rel?: string; media?: string; hreflang?: string; type?: string; sizes?: string;
    }

    interface HtmlMapElement extends HtmlElement {
        name?: string;
    }

    interface HtmlMetaElement extends HtmlElement {
        name?: string;
        httpEquiv?: string;
        content?: string;
        charset?: string;
    }

    interface HtmlMeterElement extends HtmlElement {
        value?: string | number;
        min?: string | number;
        max?: string | number;
        low?: string | number;
        high?: string | number;
        optimum?: string | number;
    }

    interface HtmlObjectElement extends HtmlElement {
        data?: string; type?: string; name?: string; usemap?: string; form?: string; width?: string; height?: string;
    }

    interface HtmlOListElement extends HtmlElement {
        reversed?: string; start?: string | number;
    }

    interface HtmlOptgroupElement extends HtmlElement {
        disabled?: string; label?: string;
    }

    interface HtmlOptionElement extends HtmlElement {
        disabled?: string; label?: string; selected?: string; value?: string;
    }

    interface HtmlOutputElement extends HtmlElement {
        for?: string; form?: string; name?: string;
    }

    interface HtmlParamElement extends HtmlElement {
        name?: string; value?: string;
    }

    interface HtmlProgressElement extends HtmlElement {
        value?: string | number; max?: string | number;
    }

    interface HtmlCommandElement extends HtmlElement {
        type?: string;
        label?: string;
        icon?: string;
        disabled?: string;
        checked?: string;
        radiogroup?: string;
        default?: string;
    }

    interface HtmlLegendElement extends HtmlElement { }

    interface HtmlBrowserButtonElement extends HtmlElement {
        type?: string;
    }

    interface HtmlMenuElement extends HtmlElement {
        type?: string;
        label?: string;
    }

    interface HtmlScriptElement extends HtmlElement {
        src?: string; type?: string; charset?: string; async?: string; defer?: string; crossorigin?: string; text?: string;
    }

    interface HtmlDetailsElement extends HtmlElement {
        open?: string;
    }

    interface HtmlSelectElement extends HtmlElement {
        autofocus?: string; disabled?: string; form?: string; multiple?: string; name?: string; required?: string; size?: string;
    }

    interface HtmlSourceElement extends HtmlElement {
        src?: string; type?: string; media?: string;
    }

    interface HtmlStyleElement extends HtmlElement {
        media?: string; type?: string; disabled?: string; scoped?: string;
    }

    interface HtmlTableElement extends HtmlElement {
    }

    interface HtmlTableDataCellElement extends HtmlElement {
        colspan?: string | number; rowspan?: string | number; headers?: string;
    }

    interface HtmlTextAreaElement extends HtmlElement {
        autofocus?: string; cols?: string; dirname?: string; disabled?: string; form?: string; maxlength?: string; minlength?: string; name?: string; placeholder?: string; readonly?: string; required?: string; rows?: string; wrap?: string;
    }

    interface HtmlTableHeaderCellElement extends HtmlElement {
        colspan?:string | number; rowspan?: string | number; headers?: string; scope?: string;
    }

    interface HtmlTimeElement extends HtmlElement {
        datetime?: string | Date;
    }

    interface HtmlTrackElement extends HtmlElement {
        default?: string; kind?: string; label?: string; src?: string; srclang?: string;
    }

    interface HtmlVideoElement extends HtmlElement {
        src?: string;
        poster?: string;
        autobuffer?: string;
        autoplay?: string;
        loop?: string;
        controls?: string;
        width?: string;
        height?: string;
    }
}
