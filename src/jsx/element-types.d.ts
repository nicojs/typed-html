declare namespace JSX {
    interface HtmlTag {
        accesskey?: string;
        class?: string;
        contenteditable?: string;
        dir?: string;
        hidden?: string | boolean;
        id?: string;
        role?: string;
        lang?: string;
        draggable?: string | boolean;
        spellcheck?: string | boolean;
        style?: string;
        tabindex?: string;
        title?: string;
        translate?: string | boolean;
    }
    interface HtmlAnchorTag extends HtmlTag {
        href?: string;
        target?: string;
        download?: string;
        ping?: string;
        rel?: string;
        media?: string;
        hreflang?: string;
        type?: string;
    }
    interface HtmlAreaTag extends HtmlTag {
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
    interface HtmlAudioTag extends HtmlTag {
        src?: string;
        autobuffer?: string;
        autoplay?: string;
        loop?: string;
        controls?: string;
    }
    interface BaseTag extends HtmlTag {
        href?: string;
        target?: string;
    }
    interface HtmlQuoteTag extends HtmlTag {
        cite?: string;
    }
    interface HtmlBodyTag extends HtmlTag {
    }
    interface HtmlButtonTag extends HtmlTag {
        action?: string;
        autofocus?: string;
        disabled?: string;
        enctype?: string;
        form?: string;
        method?: string;
        name?: string;
        novalidate?: string | boolean;
        target?: string;
        type?: string;
        value?: string;
    }
    interface HtmlDataListTag extends HtmlTag {
    }
    interface HtmlCanvasTag extends HtmlTag {
        width?: string;
        height?: string;
    }
    interface HtmlTableColTag extends HtmlTag {
        span?: string;
    }
    interface HtmlTableSectionTag extends HtmlTag {
    }
    interface HtmlTableRowTag extends HtmlTag {
    }
    interface DataTag extends HtmlTag {
        value?: string;
    }
    interface HtmlEmbedTag extends HtmlTag {
        src?: string;
        type?: string;
        width?: string;
        height?: string;
        [anything: string]: string | boolean | undefined;
    }
    interface HtmlFieldSetTag extends HtmlTag {
        disabled?: string;
        form?: string;
        name?: string;
    }
    interface HtmlFormTag extends HtmlTag {
        acceptCharset?: string;
        action?: string;
        autocomplete?: string;
        enctype?: string;
        method?: string;
        name?: string;
        novalidate?: string | boolean;
        target?: string;
    }
    interface HtmlHtmlTag extends HtmlTag {
        manifest?: string;
    }
    interface HtmlIFrameTag extends HtmlTag {
        src?: string;
        srcdoc?: string;
        name?: string;
        sandbox?: string;
        seamless?: string;
        width?: string;
        height?: string;
    }
    interface HtmlImageTag extends HtmlTag {
        alt?: string;
        src?: string;
        crossorigin?: string;
        usemap?: string;
        ismap?: string;
        width?: string;
        height?: string;
    }
    interface HtmlInputTag extends HtmlTag {
        accept?: string;
        action?: string;
        alt?: string;
        autocomplete?: string;
        autofocus?: string;
        checked?: string | boolean;
        disabled?: string | boolean;
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
        novalidate?: string | boolean;
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
    interface HtmlModTag extends HtmlTag {
        cite?: string;
        datetime?: string | Date;
    }
    interface KeygenTag extends HtmlTag {
        autofocus?: string;
        challenge?: string;
        disabled?: string;
        form?: string;
        keytype?: string;
        name?: string;
    }
    interface HtmlLabelTag extends HtmlTag {
        form?: string;
        for?: string;
    }
    interface HtmlLITag extends HtmlTag {
        value?: string | number;
    }
    interface HtmlLinkTag extends HtmlTag {
        href?: string;
        crossorigin?: string;
        rel?: string;
        media?: string;
        hreflang?: string;
        type?: string;
        sizes?: string;
        integrity?: string;
    }
    interface HtmlMapTag extends HtmlTag {
        name?: string;
    }
    interface HtmlMetaTag extends HtmlTag {
        name?: string;
        httpEquiv?: string;
        content?: string;
        charset?: string;
    }
    interface HtmlMeterTag extends HtmlTag {
        value?: string | number;
        min?: string | number;
        max?: string | number;
        low?: string | number;
        high?: string | number;
        optimum?: string | number;
    }
    interface HtmlObjectTag extends HtmlTag {
        data?: string;
        type?: string;
        name?: string;
        usemap?: string;
        form?: string;
        width?: string;
        height?: string;
    }
    interface HtmlOListTag extends HtmlTag {
        reversed?: string;
        start?: string | number;
    }
    interface HtmlOptgroupTag extends HtmlTag {
        disabled?: string;
        label?: string;
    }
    interface HtmlOptionTag extends HtmlTag {
        disabled?: string;
        label?: string;
        selected?: string;
        value?: string;
    }
    interface HtmlOutputTag extends HtmlTag {
        for?: string;
        form?: string;
        name?: string;
    }
    interface HtmlParamTag extends HtmlTag {
        name?: string;
        value?: string;
    }
    interface HtmlProgressTag extends HtmlTag {
        value?: string | number;
        max?: string | number;
    }
    interface HtmlCommandTag extends HtmlTag {
        type?: string;
        label?: string;
        icon?: string;
        disabled?: string;
        checked?: string;
        radiogroup?: string;
        default?: string;
    }
    interface HtmlLegendTag extends HtmlTag {
    }
    interface HtmlBrowserButtonTag extends HtmlTag {
        type?: string;
    }
    interface HtmlMenuTag extends HtmlTag {
        type?: string;
        label?: string;
    }
    interface HtmlScriptTag extends HtmlTag {
        src?: string;
        type?: string;
        charset?: string;
        async?: string;
        defer?: string;
        crossorigin?: string;
        integrity?: string;
        text?: string;
    }
    interface HtmlDetailsTag extends HtmlTag {
        open?: string;
    }
    interface HtmlSelectTag extends HtmlTag {
        autofocus?: string;
        disabled?: string;
        form?: string;
        multiple?: string;
        name?: string;
        required?: string;
        size?: string;
    }
    interface HtmlSourceTag extends HtmlTag {
        src?: string;
        type?: string;
        media?: string;
    }
    interface HtmlStyleTag extends HtmlTag {
        media?: string;
        type?: string;
        disabled?: string;
        scoped?: string;
    }
    interface HtmlTableTag extends HtmlTag {
    }
    interface HtmlTableDataCellTag extends HtmlTag {
        colspan?: string | number;
        rowspan?: string | number;
        headers?: string;
    }
    interface HtmlTextAreaTag extends HtmlTag {
        autofocus?: string;
        cols?: string;
        dirname?: string;
        disabled?: string;
        form?: string;
        maxlength?: string;
        minlength?: string;
        name?: string;
        placeholder?: string;
        readonly?: string;
        required?: string;
        rows?: string;
        wrap?: string;
    }
    interface HtmlTableHeaderCellTag extends HtmlTag {
        colspan?: string | number;
        rowspan?: string | number;
        headers?: string;
        scope?: string;
    }
    interface HtmlTimeTag extends HtmlTag {
        datetime?: string | Date;
    }
    interface HtmlTrackTag extends HtmlTag {
        default?: string;
        kind?: string;
        label?: string;
        src?: string;
        srclang?: string;
    }
    interface HtmlVideoTag extends HtmlTag {
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
//# sourceMappingURL=element-types.d.ts.map