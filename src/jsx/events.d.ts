declare namespace JSX {

    // http://htmlcss.wikia.com/wiki/HTML5_Event_Attributes

    // Only used in the <body> element to specify events triggered for a window object. 
    interface HtmlBodyTag {
        onafterprint?: string;
        onbeforeprint?: string;
        onbeforeonload?: string;
        onblur?: string;
        onerror?: string;
        onfocus?: string;
        onhaschange?: string;
        onload?: string;
        onmessage?: string;
        onoffline?: string;
        ononline?: string;
        onpagehide?: string;
        onpageshow?: string;
        onpopstate?: string;
        onredo?: string;
        onresize?: string;
        onstorage?: string;
        onundo?: string;
        onunload?: string;

    }

    interface HtmlTag {
        oncontextmenu?: string;
        onkeydown?: string;
        onkeypress?: string;
        onkeyup?: string;
        onclick?: string;
        ondblclick?: string;
        ondrag?: string;
        ondragend?: string;
        ondragenter?: string;
        ondragleave?: string;
        ondragover?: string;
        ondragstart?: string;
        ondrop?: string;
        onmousedown?: string;
        onmousemove?: string;
        onmouseout?: string;
        onmouseover?: string;
        onmouseup?: string;
        onmousewheel?: string;
        onscroll?: string;
    }

    // Applies to all HTML5 elements, but is most common in <audio>, <embed />, <img />, <object>, and <video>.
    interface FormEvents {
        onblur?: string;
        onchange?: string;
        onfocus?: string;
        onformchange?: string;
        onforminput?: string;
        oninput?: string;
        oninvalid?: string;
        onselect?: string;
        onsubmit?: string;
    }
    interface HtmlInputTag extends FormEvents {
    }

    interface HtmlFieldSetTag extends FormEvents {
    }

    interface HtmlFormTag extends FormEvents {
    }


    // Applies to all HTML5 elements, but is most common in <audio>, <embed />, <img />, <object>, and <video>.
    interface MediaEvents {
        onabort?: string;
        oncanplay?: string;
        oncanplaythrough?: string;
        ondurationchange?: string;
        onemptied?: string;
        onended?: string;
        onerror?: string;
        onloadeddata?: string;
        onloadedmetadata?: string;
        onloadstart?: string;
        onpause?: string;
        onplay?: string;
        onplaying?: string;
        onprogress?: string;
        onratechange?: string;
        onreadystatechange?: string;
        onseeked?: string;
        onseeking?: string;
        onstalled?: string;
        onsuspend?: string;
        ontimeupdate?: string;
        onvolumechange?: string;
        onwaiting?: string;
    }
    interface HtmlAudioTag extends MediaEvents { }
    interface HtmlEmbedTag extends MediaEvents { }
    interface HtmlImageTag extends MediaEvents { }
    interface HtmlObjectTag extends MediaEvents { }
    interface HtmlVideoTag extends MediaEvents { }
}