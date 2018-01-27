import ColorUtil from '../util/Color'
import Dom from '../util/Dom'
import Event from '../util/Event'
import EventMachin from '../util/EventMachin'

import ColorControl from './ColorControl'
import ColorInformation from './ColorInformation'
import ColorPalette from './ColorPalette'
import ColorSetsChooser from './ColorSetsChooser'
import ColorSetsList from './ColorSetsList'
import CurrentColorSets from './CurrentColorSets'
import CurrentColorSetsContextMenu from './CurrentColorSetsContextMenu'

const color = ColorUtil.color;
const hue_color = ColorUtil.hue_color;


export default class ColorPicker extends EventMachin {
    constructor (opt) {
        super();

        this.opt = opt || {}; 
        this.$body = null;
        this.$root = null;
        this.currentA = 0;
        this.currentH = 0;
        this.currentS = 0;
        this.currentV = 0;
        this.colorSetsList = new ColorSetsList(this);  
        this.colorpickerCallback = function () {};

        this.isColorPickerShow = false;
        this.isShortCut = false;
        this.hideDelay = 2000;
        this.timerCloseColorPicker;

        this.control = new ColorControl(this);
        this.palette = new ColorPalette(this);
        this.information = new ColorInformation(this);
        this.colorSetsChooser = new ColorSetsChooser(this);
        this.currentColorSets = new CurrentColorSets(this);
        this.contextMenu = new CurrentColorSetsContextMenu(this, this.currentColorSets);

        this.initialize();
    }

    getOption (key) {
        return this.opt[key];
    }

    initialize () {
        this.$body = new Dom(document.body);
        this.$root = new Dom('div', 'codemirror-colorpicker');

        this.$arrow = new Dom('div', 'arrow');


        this.$root.append(this.$arrow);
        this.$root.append(this.palette.$el);
        this.$root.append(this.control.$el);
        this.$root.append(this.information.$el);
        this.$root.append(this.currentColorSets.$el);
        this.$root.append(this.colorSetsChooser.$el);
        this.$root.append(this.contextMenu.$el);
                
        this.$checkColorPickerClass = this.checkColorPickerClass.bind(this);        

        this.initColor();        
    }

    showContextMenu (e, index) {
        this.contextMenu.show(e, index);
    }

    setColor(value) {
        if(typeof(value) == "object") {
            if(!value.r || !value.g || !value.b)
                return;

            this.initColor(color.format(value, "hex"));
        } else if(typeof(value) == "string") {
            this.initColor(value); 
        }
    }

    getColor(type) {
        this.caculateHSV();
        var rgb = this.convertRGB();

        if (type) {
            return color.format(rgb, type);
        }

        return rgb;
    }

    definePostion (opt) {

        var width = this.$root.width();
        var height = this.$root.height();

        // set left position for color picker
        var elementScreenLeft = opt.left - this.$body.el.scrollLeft ;
        if (width + elementScreenLeft > window.innerWidth) {
            elementScreenLeft -= (width + elementScreenLeft) - window.innerWidth;
        }
        if (elementScreenLeft < 0) { elementScreenLeft = 0; }

        // set top position for color picker
        var elementScreenTop = opt.top - this.$body.el.scrollTop ;
        if (height + elementScreenTop > window.innerHeight) {
            elementScreenTop -= (height + elementScreenTop) - window.innerHeight;
        }
        if (elementScreenTop < 0) { elementScreenTop = 0; }

        // set position
        this.$root.css({
            left : (elementScreenLeft - 25) + 'px',
            top : (elementScreenTop + 9) + 'px'
        });
    }

    show (opt, color,  callback) {
        this.destroy();
        this.initializeEvent();
        this.$root.appendTo(document.body);

        this.$root.css({
            position: 'fixed',  // color picker has fixed position
            left : '-10000px',
            top : '-10000px'
        }).show();

        this.definePostion(opt);

        this.isColorPickerShow = true;

        this.isShortCut = opt.isShortCut || false;
        
        this.initColor(color);

        // define colorpicker callback
        this.colorpickerCallback = function (colorString) {
            callback(colorString);
        }

        // define hide delay
        this.hideDelay = opt.hideDelay || 2000;
        if (this.hideDelay > 0) {
            this.setHideDelay(this.hideDelay);
        }

    }

    setHideDelay (delayTime) {
        delayTime = delayTime || 0;
        Event.removeEvent(this.$root.el, 'mouseenter');
        Event.removeEvent(this.$root.el, 'mouseleave');

        Event.addEvent(this.$root.el, 'mouseenter', () => {
            clearTimeout(this.timerCloseColorPicker);
        });

        Event.addEvent(this.$root.el, 'mouseleave', ()  => { 
            clearTimeout(this.timerCloseColorPicker);
            this.timerCloseColorPicker = setTimeout(this.hide.bind(this), delayTime);
        });

        clearTimeout(this.timerCloseColorPicker);
        this.timerCloseColorPicker = setTimeout(this.hide.bind(this), delayTime);
    }

    hide () {
        if (this.isColorPickerShow) {
            //this.destroy();
            //this.$root.hide();
            //this.$root.remove();
            //this.isColorPickerShow = false;
        }
    }    

    convertRGB() {
        return color.HSVtoRGB(this.currentH, this.currentS, this.currentV);
    }
    
    convertHEX() {
        return color.format(this.convertRGB(), 'hex');
    }
    
    convertHSL() {
        var rgb = color.HSVtoRGB(this.currentH, this.currentS, this.currentV);
        return color.RGBtoHSL(rgb.r, rgb.g, rgb.b);
    }

    getCurrentColor () {
        return this.getFormattedColor(this.information.getFormat());
    }

    getFormattedColor (format) {
        format = format || 'hex';
    
        if (format == 'rgb') {
            var rgb = this.convertRGB();
            rgb.a = this.currentA == 1 ? undefined : this.currentA;
            return color.format(rgb, 'rgb');
        } else if (format == 'hsl') {
            var hsl = this.convertHSL();
            hsl.a = this.currentA == 1 ? undefined : this.currentA;
            return color.format(hsl, 'hsl');
        } else {
            var rgb = this.convertRGB();
            return color.format(rgb, 'hex');
        }
    }



    setInputColor() {
    

        this.information.setInputColor();
        this.control.setInputColor();

    
        if (typeof this.colorpickerCallback == 'function') {
    
            if (!isNaN(this.currentA)) {
                this.colorpickerCallback(this.getCurrentColor());
            }
    
        }
    }    

    
    caculateHSV() {

        var obj = this.palette.caculateSV();
        var control = this.control.caculateH();

        var s = obj.s;
        var v = obj.v; 
        var h = control.h ;


        if (obj.width == 0) {
            h = 0;
            s = 0;
            v = 0;
        }

        this.currentH = h;
        this.currentS = s;
        this.currentV = v;
    }


    setColorUI() {        
        this.control.setColorUI()
        this.palette.setColorUI()
    }

    setCurrentHSV (h, s, v, a) {
        this.currentA = a;
        this.currentH = h;
        this.currentS = s;
        this.currentV = v;
    }    
        

    setCurrentH (h) {
        this.currentH = h;
    }

    setCurrentA ( a) {
        this.currentA = a;
    }

    setBackgroundColor (color) {
        this.palette.setBackgroundColor(color);
    }

    initColor(newColor) {
        var c = newColor || "#FF0000", colorObj = color.parse(c);
    
        this.information.setCurrentFormat(colorObj.type);
        this.palette.setBackgroundColor(c);
    
        var hsv = color.RGBtoHSV(colorObj.r, colorObj.g, colorObj.b);
    
        this.setCurrentHSV(hsv.h, hsv.s, hsv.v, colorObj.a);
        this.setColorUI();
        this.control.setHueColor();
        this.setInputColor();
    }    

    checkColorPickerClass(el) {
        var hasColorView = new Dom(el).closest('codemirror-colorview');
        var hasColorPicker = new Dom(el).closest('codemirror-colorpicker');
        var hasCodeMirror = new Dom(el).closest('CodeMirror');
        var IsInHtml = el.nodeName == 'HTML';
    
        return !!(hasColorPicker || hasColorView || hasCodeMirror);
    }
    
    checkInHtml (el) {
        var IsInHtml = el.nodeName == 'HTML';
    
        return IsInHtml;
    }    

    // Event Bindings 
    'mouseup document' (e) {
        this.palette.EventDocumentMouseUp(e);
        this.control.EventDocumentMouseUp(e);
    
        // when color picker clicked in outside
        if (this.checkInHtml(e.target)) {
            //this.setHideDelay(hideDelay);
        } else if (this.checkColorPickerClass(e.target) == false ) {
            this.hide();
        }
    }

    'mousemove document' (e) {
        this.palette.EventDocumentMouseMove(e);
        this.control.EventDocumentMouseMove(e);
    }    

    initializeEvent () {

        this.initializeEventMachin();

        this.palette.initializeEvent();
        this.control.initializeEvent();
        this.information.initializeEvent()
        this.currentColorSets.initializeEvent() 
        this.colorSetsChooser.initializeEvent();
        this.contextMenu.initializeEvent();
    
    }

    currentFormat () {
        this.information.currentFormat();
    }

    toggleColorChooser () {
        this.colorSetsChooser.toggle();
    }

    refreshColorSetsChooser() {
        this.colorSetsChooser.refresh();
    }

    getColorSetsList () {
        return this.colorSetsList.getColorSetsList();
    }

    setCurrentColorSets (nameOrIndex) {
        this.colorSetsList.setCurrentColorSets(nameOrIndex);
        this.currentColorSets.refresh();
    }

    setColorSets (list) {
        this.colorSetsList.setUserList(list);
    } 

    destroy() {
        this.destroyEventMachin();

        this.control.destroy();
        this.palette.destroy();
        this.information.destroy();
        this.colorSetsChooser.destroy();
        this.colorSetsList.destroy();
        this.currentColorSets.destroy();
        this.contextMenu.destroy();

        // remove color picker callback
        this.colorpickerCallback = undefined;
    }
}