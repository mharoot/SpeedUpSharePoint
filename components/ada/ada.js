(function(){
  // ---------------- LANGUAGES (with flags!) ----------------
  var LANGUAGES = {
    'en': {name: 'English (US)', flag: '🇺🇸'},
    'en-GB': {name: 'English (UK)', flag: '🇬🇧'},
    'en-CA': {name: 'English (CA)', flag: '🇨🇦'},
    'es': {name: 'Español', flag: '🇪🇸'},
    'de': {name: 'Deutsch', flag: '🇩🇪'},
    'pt': {name: 'Português', flag: '🇵🇹'},
    'fr': {name: 'Français', flag: '🇫🇷'},
    'it': {name: 'Italiano', flag: '🇮🇹'},
    'he': {name: 'עברית', flag: '🇮🇱'},
    'zh-TW': {name: '繁體中文', flag: '🇹🇼'},
    'ru': {name: 'Pусский', flag: '🇷🇺'},
    'ar': {name: 'العربية', flag: '🇸🇦'},
    'uk': {name: 'Українська', flag: '🇺🇦'},
    'nl': {name: 'Nederlands', flag: '🇳🇱'},
    'zh-CN': {name: '简体中文', flag: '🇨🇳'},
    'ja': {name: '日本語', flag: '🇯🇵'},
    'pl': {name: 'Polski', flag: '🇵🇱'},
    'tr': {name: 'Türkçe', flag: '🇹🇷'},
    'cs': {name: 'Čeština', flag: '🇨🇿'},
    'hu': {name: 'Magyar', flag: '🇭🇺'},
    'sl': {name: 'Slovenščina', flag: '🇸🇮'},
    'sk': {name: 'Slovenčina', flag: '🇸🇰'},
    'no': {name: 'Norsk Bokmål', flag: '🇳🇴'},
    'sv': {name: 'Svenska', flag: '🇸🇪'},
    'fi': {name: 'Suomi', flag: '🇫🇮'},
    'ro': {name: 'română', flag: '🇷🇴'},
    'ga': {name: 'Gaeilge', flag: '🇮🇪'},
    'el': {name: 'Ελληνικά', flag: '🇬🇷'},
    'sr': {name: 'Srpski', flag: '🇷🇸'},
    'bs': {name: 'Bosanski', flag: '🇧🇦'},
    'hr': {name: 'Hrvatski', flag: '🇭🇷'},
    'lb': {name: 'Lëtzebuergesch', flag: '🇱🇺'},
    'sq': {name: 'Shqip', flag: '🇦🇱'},
    'da': {name: 'Dansk', flag: '🇩🇰'}
  };
  
  // ---------------- PROFILES ----------------
  var PROFILES = [
    {id:'seizures', title:'Seizure Safe', text:'Clear flashes & colors', description:'Eliminates flashing content', active:false},
    {id:'vision', title:'Vision Impaired', text:'Enhances visuals', description:'Adjusts site for visual impairments', active:false},
    {id:'adhd', title:'ADHD Friendly', text:'More focus', description:'Reduces distractions', active:false},
    {id:'cognitive', title:'Cognitive Disability', text:'Assists with reading', description:'Helps cognitive focus', active:false},
    {id:'motor', title:'Keyboard Navigation', text:'Use keyboard', description:'Full keyboard operation', active:false},
    {id:'blind', title:'Screen Reader', text:'Optimize for screen-readers', description:'Screen-reader compatibility', active:false}
  ];
  
  // ---------------- ACTIONS ----------------
  var ACTIONS = [
    {id:'zoom', title:'Content Scaling', type:'range', min:0, max:100, step:10, value:0},
    {id:'readableFont', title:'Readable Font', type:'toggle'},
    {id:'emphasizeTitles', title:'Highlight Titles', type:'toggle'},
    {id:'emphasizeLinks', title:'Highlight Links', type:'toggle'},
    {id:'magnifier', title:'Text Magnifier', type:'toggle'},
    {id:'fontSize', title:'Adjust Font Size', type:'range', min:0, max:100, step:10, value:0},
    {id:'lineHeight', title:'Adjust Line Height', type:'range', min:0, max:100, step:10, value:0},
    {id:'letterSpacing', title:'Adjust Letter Spacing', type:'range', min:0, max:100, step:10, value:0},
    {id:'darkContrast', title:'Dark Contrast', type:'toggle'},
    {id:'lightContrast', title:'Light Contrast', type:'toggle'},
    {id:'highContrast', title:'High Contrast', type:'toggle'},
    {id:'highSaturation', title:'High Saturation', type:'toggle'},
    {id:'monochrome', title:'Monochrome', type:'toggle'},
    {id:'titleColor', title:'Title Color', type:'color'},
    {id:'textColor', title:'Text Color', type:'color'},
    {id:'backgroundColor', title:'Background Color', type:'color'},
    {id:'mute', title:'Mute Sounds', type:'toggle'},
    {id:'hideImages', title:'Hide Images', type:'toggle'},
    {id:'readMode', title:'Read Mode', type:'toggle'},
    {id:'readingGuide', title:'Reading Guide', type:'toggle'},
    {id:'stopAnimations', title:'Stop Animations', type:'toggle'},
    {id:'emphasizeHover', title:'Highlight Hover', type:'toggle'},
    {id:'emphasizeFocus', title:'Highlight Focus', type:'toggle'},
    {id:'bigBlackCursor', title:'Big Black Cursor', type:'toggle'},
    {id:'bigWhiteCursor', title:'Big White Cursor', type:'toggle'}
  ];
  
  // ---------------- ACCESSIBILITY WIDGET ----------------
  var ACCESSIBILITY = {
    widget:null,
    trigger:null,
    originalLineHeight: null,
    currentLanguage: 'en',
    magnifierPopup: null,
    magnifierActive: false,
    readingGuideActive: false,
    readingGuideMouseMove: null,
    adhdFocusActive: false,
    adhdFocusMouseMove: null,
    keyboardNavActive: false,
    keyboardNavListener: null,
    focusableElements: [],
    currentFocusIndex: -1,
    screenReaderActive: false,
    screenReaderSpeaking: false,
    speechSynthesis: null,
    focusTrackingActive: false,
    focusTrackingListener: null,
    translating: false,
    widgetFocusTrap: null,
  
    init:function(){
      // Check if user has permanently disabled the widget
      if(localStorage.getItem('accessibility-widget-disabled') === 'true'){
        console.log('🚫 Accessibility widget is disabled by user preference');
        var widget = document.getElementById('accessibilityWidget');
        var trigger = document.getElementById('accessibilityTrigger');
        if(widget) widget.style.display = 'none';
        if(trigger) trigger.style.display = 'none';
        return;
      }
      
      this.originalLineHeight = window.getComputedStyle(document.body).lineHeight;
      
      this.widget = document.getElementById('accessibilityWidget');
      this.trigger = document.getElementById('accessibilityTrigger');
      this.magnifierPopup = document.getElementById('text-magnifier-popup');
      
      if(!document.getElementById('accessibility-filter-wrapper')){
        this.createFilterWrapper();
      }
      
      this.setupTriggerListeners();
      this.setupWidgetListeners();
      this.setupLanguageDropdown();
      this.setupProfileListeners();
      this.setupActionListeners();
      
      this.restorePreferences();
      this.restoreLanguage();
      
      this.initializeGoogleTranslate();
    },

    createFilterWrapper:function(){
      var wrapper = document.getElementById('accessibility-filter-wrapper');
      if(!wrapper){
        wrapper = document.createElement('div');
        wrapper.id = 'accessibility-filter-wrapper';
        
        var elementsToMove = [];
        for(var i = 0; i < document.body.children.length; i++){
          var child = document.body.children[i];
          if(child.id !== 'accessibilityWidget' && 
             child.id !== 'accessibilityTrigger' &&
             child.id !== 'text-magnifier-popup' &&
             child.id !== 'google_translate_element'){
            elementsToMove.push(child);
          }
        }
        
        for(var j = 0; j < elementsToMove.length; j++){
          wrapper.appendChild(elementsToMove[j]);
        }
        
        document.body.insertBefore(wrapper, document.body.firstChild);
      }
    },

    initializeGoogleTranslate:function(){
      // Don't load the script - it's already in the HTML
      // Just define the callback function
      
      var self = this;
      
      window.googleTranslateElementInit = function() {
        // Check if already initialized
        if(document.querySelector('.goog-te-combo')){
          console.log('⚠️ Google Translate element already exists');
          return;
        }
        
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
        
        console.log('✅ Google Translate loaded successfully');
      };
      
      // If Google Translate library is already loaded, initialize it now
      if(typeof google !== 'undefined' && google.translate){
        window.googleTranslateElementInit();
      }
      // Otherwise, the callback will be called automatically when the script loads
    },

    setupTriggerListeners:function(){
      var self = this;
      
      this.trigger.addEventListener('click', function(){ 
        self.toggleWidget();
      });
      
      this.trigger.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          self.toggleWidget();
        }
      });
    },

    toggleWidget:function(){
      var isOpen = this.widget.classList.toggle('accessibilityOpen');
      this.trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      this.trigger.setAttribute('aria-label', isOpen ? 'Close accessibility settings' : 'Open accessibility settings');
      
      if(isOpen){
        var self = this;
        // Small delay to let Google Translate finish any DOM manipulation
        setTimeout(function(){
          self.setupWidgetFocusTrap();
          var firstFocusable = self.widget.querySelector('.accessibilityClose');
          if(firstFocusable) firstFocusable.focus();
        }, 150); // Increased from 100ms to 150ms
      } else {
        this.removeWidgetFocusTrap();
      }
    },

    setupWidgetListeners:function(){
      var self = this;
      
      var closeBtn = this.widget.querySelector('.accessibilityClose');
      closeBtn.addEventListener('click', function(){ 
        self.closeWidget();
      });
      
      closeBtn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          self.closeWidget();
        }
      });

      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && self.widget.classList.contains('accessibilityOpen')){
          e.preventDefault();
          self.closeWidget();
        }
      });

      this.widget.querySelector('.reset-button__btn').addEventListener('click', function(){
        if(confirm('Are you sure you want to reset all accessibility settings? This will restore defaults and return to English.')){
          self.resetAllSettings();
        }
      });

      var disableBtn = this.widget.querySelector('.disable-widget-btn');
      disableBtn.addEventListener('click', function(){
        var confirmMessage = 
          'Are you sure you want to permanently disable the accessibility widget?\n\n' +
          '⚠️ This will:\n' +
          '• Hide the accessibility button on all pages\n' +
          '• Remove all accessibility features\n' +
          '• Persist until you clear browser data\n\n' +
          'You can re-enable it by clearing your browser\'s localStorage or cache.';
        
        if(confirm(confirmMessage)){
          localStorage.setItem('accessibility-widget-disabled', 'true');
          self.widget.classList.remove('accessibilityOpen');
          self.removeWidgetFocusTrap();
          self.trigger.style.display = 'none';
          alert('✅ Accessibility widget has been disabled.\n\nTo re-enable it, clear your browser data or localStorage.');
          console.log('🚫 Accessibility widget disabled by user');
        }
      });

      disableBtn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          disableBtn.click();
        }
      });
    },

    closeWidget:function(){
      this.widget.classList.remove('accessibilityOpen');
      this.removeWidgetFocusTrap();
      this.trigger.setAttribute('aria-expanded', 'false');
      this.trigger.setAttribute('aria-label', 'Open accessibility settings');
      this.trigger.focus();
    },

    setupLanguageDropdown:function(){
      var self = this;
      var languageButton = this.widget.querySelector('.language-dropdown__button');
      var languageMenu = this.widget.querySelector('.language-dropdown__menu');
      var currentLanguageSpan = this.widget.querySelector('.current-language');
      var currentFlagSpan = this.widget.querySelector('.current-flag');
      
      var langCodes = Object.keys(LANGUAGES);
      for(var i = 0; i < langCodes.length; i++){
        (function(langCode){
          var langData = LANGUAGES[langCode];
          if(langData && langData.name && langData.flag){
            var langOption = document.createElement('button');
            langOption.className = 'language-dropdown__option';
            langOption.innerHTML = '<span class="lang-flag">' + langData.flag + '</span> ' + langData.name;
            langOption.dataset.lang = langCode;
            langOption.addEventListener('click', function(){
              console.log('Clicked language:', langCode, langData.name, langData.flag);
              self.changeLanguage(langCode, langData.name, langData.flag);
              currentLanguageSpan.textContent = langData.name;
              currentFlagSpan.textContent = langData.flag;
              console.log('Updated UI - Flag:', langData.flag, 'Name:', langData.name);
              languageMenu.classList.remove('language-dropdown__menu--open');
            });
            languageMenu.appendChild(langOption);
          }
        })(langCodes[i]);
      }

      languageButton.addEventListener('click', function(e){
        e.stopPropagation();
        languageMenu.classList.toggle('language-dropdown__menu--open');
      });

      document.addEventListener('click', function(){
        languageMenu.classList.remove('language-dropdown__menu--open');
      });
    },

    setupProfileListeners:function(){
      var self = this;
      var profiles = this.widget.querySelectorAll('.profile');
      
      for(var i = 0; i < profiles.length; i++){
        (function(profileEl){
          var profileId = profileEl.dataset.id;
          
          profileEl.addEventListener('click', function(){
            var newState = !profileEl.classList.contains('profile--active');
            profileEl.classList.toggle('profile--active');
            profileEl.setAttribute('aria-checked', newState ? 'true' : 'false');
            localStorage.setItem(profileId, newState);
            self.applyProfileEffect(profileId, newState);
          });
          
          profileEl.addEventListener('keydown', function(e){
            if(e.key === 'Enter' || e.key === ' '){
              e.preventDefault();
              var newState = !profileEl.classList.contains('profile--active');
              profileEl.classList.toggle('profile--active');
              profileEl.setAttribute('aria-checked', newState ? 'true' : 'false');
              localStorage.setItem(profileId, newState);
              self.applyProfileEffect(profileId, newState);
            }
          });
        })(profiles[i]);
      }
    },

    setupActionListeners:function(){
      var self = this;
      var actionBoxes = this.widget.querySelectorAll('.action-box');
      
      for(var i = 0; i < actionBoxes.length; i++){
        (function(actionBox){
          var actionId = actionBox.dataset.id;
          var action = ACTIONS.find(function(a){ return a.id === actionId; });
          
          if(!action) return;
          
          if(action.type === 'toggle'){
            actionBox.addEventListener('click', function(e){
              e.preventDefault();
              e.stopPropagation();
              actionBox.classList.toggle('action-box--active');
              var isActive = actionBox.classList.contains('action-box--active');
              localStorage.setItem(actionId, isActive);
              self.applyActionEffect(actionId, isActive);
            });
          }
          
          if(action.type === 'range'){
            var minusBtn = actionBox.querySelector('.range button:first-child');
            var plusBtn = actionBox.querySelector('.range button:last-child');
            var baseEl = actionBox.querySelector('.range__base');
            
            minusBtn.addEventListener('click', function(){
              action.value = Math.max(action.min, action.value - action.step);
              baseEl.textContent = action.value + '%';
              localStorage.setItem(actionId, action.value);
              self.applyActionEffect(actionId, action.value);
            });
            
            plusBtn.addEventListener('click', function(){
              action.value = Math.min(action.max, action.value + action.step);
              baseEl.textContent = action.value + '%';
              localStorage.setItem(actionId, action.value);
              self.applyActionEffect(actionId, action.value);
            });
          }
          
          if(action.type === 'color'){
            var colorButtons = actionBox.querySelectorAll('.color-picker__selection');
            var cancelBtn = actionBox.querySelector('.color-picker__cancel');
            
            for(var j = 0; j < colorButtons.length; j++){
              (function(colorBtn){
                var color = colorBtn.style.backgroundColor;
                colorBtn.addEventListener('click', function(){
                  localStorage.setItem(actionId, color);
                  document.body.style.setProperty('--' + actionId, color);
                  self.applyActionEffect(actionId, color);
                });
              })(colorButtons[j]);
            }
            
            if(cancelBtn){
              cancelBtn.addEventListener('click', function(){
                localStorage.removeItem(actionId);
                document.body.style.removeProperty('--' + actionId);
                if(actionId === 'backgroundColor'){
                  document.body.classList.remove('has-backgroundColor');
                }
                self.applyActionEffect(actionId, null);
              });
            }
          }
        })(actionBoxes[i]);
      }
    },

    setupMagnifierListeners:function(){
      var self = this;
      var popup = this.magnifierPopup;
      
      if(this.magnifierMouseMove){
        document.removeEventListener('mousemove', this.magnifierMouseMove);
      }
      if(this.magnifierMouseOut){
        document.removeEventListener('mouseout', this.magnifierMouseOut);
      }
      
      this.magnifierMouseMove = function(e){
        var target = e.target;
        
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger') || target.closest('#text-magnifier-popup')){
          popup.classList.remove('active');
          return;
        }
        
        var textElements = 'h1,h2,h3,h4,h5,h6,p,span,a,li,label,strong,em,b,td,th,div';
        if(!target.matches(textElements)){
          popup.classList.remove('active');
          return;
        }
        
        var text = target.textContent.trim();
        if(!text || text.length === 0){
          popup.classList.remove('active');
          return;
        }
        
        if(text.length > 300){
          text = text.substring(0, 300) + '...';
        }
        
        popup.textContent = text;
        popup.classList.add('active');
        
        var x = e.clientX;
        var y = e.clientY;
        
        var offsetX = 20;
        var offsetY = 20;
        
        var popupRect = popup.getBoundingClientRect();
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;
        
        if(x + offsetX + popupRect.width > viewportWidth){
          x = x - popupRect.width - offsetX;
        } else {
          x = x + offsetX;
        }
        
        if(y + offsetY + popupRect.height > viewportHeight){
          y = y - popupRect.height - offsetY;
        } else {
          y = y + offsetY;
        }
        
        popup.style.left = x + 'px';
        popup.style.top = y + 'px';
      };
      
      this.magnifierMouseOut = function(e){
        if(e.relatedTarget === null){
          popup.classList.remove('active');
        }
      };
      
      document.addEventListener('mousemove', this.magnifierMouseMove);
      document.addEventListener('mouseout', this.magnifierMouseOut);
    },

    removeMagnifierListeners:function(){
      if(this.magnifierMouseMove){
        document.removeEventListener('mousemove', this.magnifierMouseMove);
      }
      if(this.magnifierMouseOut){
        document.removeEventListener('mouseout', this.magnifierMouseOut);
      }
      if(this.magnifierPopup){
        this.magnifierPopup.classList.remove('active');
      }
    },

    setupReadingGuideListeners:function(){
      var self = this;
      
      if(this.readingGuideMouseMove){
        document.removeEventListener('mousemove', this.readingGuideMouseMove);
      }
      
      var styleId = 'reading-guide-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
      
      var style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      
      this.readingGuideMouseMove = function(e){
        var x = e.clientX;
        var y = e.clientY;
        
        if(style.sheet){
          while(style.sheet.cssRules.length > 0){
            style.sheet.deleteRule(0);
          }
          
          style.sheet.insertRule('body.readingGuide::after { top: ' + y + 'px !important; left: ' + x + 'px !important; }', 0);
          style.sheet.insertRule('body.readingGuide::before { top: ' + y + 'px !important; left: ' + x + 'px !important; }', 1);
        }
      };
      
      document.addEventListener('mousemove', this.readingGuideMouseMove);
    },

    removeReadingGuideListeners:function(){
      if(this.readingGuideMouseMove){
        document.removeEventListener('mousemove', this.readingGuideMouseMove);
      }
      
      var styleId = 'reading-guide-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
    },

    setupAdhdFocusListeners:function(){
      var self = this;
      
      console.log('🎯 Setting up ADHD focus listeners...');
      
      if(this.adhdFocusMouseMove){
        document.removeEventListener('mousemove', this.adhdFocusMouseMove);
      }
      
      var styleId = 'adhd-focus-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
      
      var style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      
      console.log('✅ Style element created');
      
      this.adhdFocusMouseMove = function(e){
        var y = e.clientY;
        var focusHeight = 175;
        var halfHeight = focusHeight / 2;
        
        var focusTop = Math.max(0, y - halfHeight);
        var focusBottom = Math.min(window.innerHeight, y + halfHeight);
        
        if(style.sheet){
          while(style.sheet.cssRules.length > 0){
            style.sheet.deleteRule(0);
          }
          
          var clipPath = 'polygon(' +
            '0% 0%, ' +
            '100% 0%, ' +
            '100% ' + focusTop + 'px, ' +
            '0% ' + focusTop + 'px, ' +
            '0% ' + focusBottom + 'px, ' +
            '100% ' + focusBottom + 'px, ' +
            '100% 100%, ' +
            '0% 100%' +
          ')';
          
          style.sheet.insertRule('body.profile-adhd::before { clip-path: ' + clipPath + ' !important; }', 0);
        }
      };
      
      document.addEventListener('mousemove', this.adhdFocusMouseMove);
      
      var initialEvent = {clientY: window.innerHeight / 2};
      this.adhdFocusMouseMove(initialEvent);
      
      console.log('✅ Mouse move listener added');
    },

    removeAdhdFocusListeners:function(){
      if(this.adhdFocusMouseMove){
        document.removeEventListener('mousemove', this.adhdFocusMouseMove);
      }
      
      var styleId = 'adhd-focus-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
    },

    setupKeyboardNavigation:function(){
      var self = this;
      
      console.log('⌨️ Setting up keyboard navigation...');
      
      if(this.keyboardNavListener){
        document.removeEventListener('keydown', this.keyboardNavListener);
      }
      
      this.keyboardNavListener = function(e){
        if(e.target.matches('input, textarea, select, [contenteditable]')){
          return;
        }
        
        var key = e.key.toLowerCase();
        
        switch(key){
          case 'm':
            e.preventDefault();
            var nav = document.querySelector('nav, [role="navigation"], header nav');
            if(nav){
              nav.focus();
              nav.scrollIntoView({behavior: 'smooth', block: 'center'});
              self.speak('Jumped to menu navigation', true);
              console.log('📍 Jumped to menu');
            }
            break;
            
          case 'h':
            e.preventDefault();
            var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            if(headings.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % headings.length;
              var heading = headings[self.currentFocusIndex];
              heading.setAttribute('tabindex', '-1');
              heading.focus();
              heading.scrollIntoView({behavior: 'smooth', block: 'center'});
              var headingText = heading.textContent.trim();
              var level = heading.tagName.charAt(1);
              self.speak('Heading level ' + level + ': ' + headingText, true);
              console.log('📍 Jumped to heading:', headingText);
            }
            break;
            
          case 'p':
            e.preventDefault();
            var paragraphs = document.querySelectorAll('p:not(#accessibilityWidget p):not(#accessibilityTrigger p)');
            if(paragraphs.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % paragraphs.length;
              var paragraph = paragraphs[self.currentFocusIndex];
              paragraph.setAttribute('tabindex', '-1');
              paragraph.focus();
              paragraph.scrollIntoView({behavior: 'smooth', block: 'center'});
              var paragraphText = paragraph.textContent.trim();
              self.speak('Paragraph: ' + paragraphText, true);
              console.log('📍 Reading paragraph:', paragraphText.substring(0, 50) + '...');
            }
            break;
            
          case 'r':
            e.preventDefault();
            self.readAllContent();
            break;
            
          case 's':
            e.preventDefault();
            if(window.speechSynthesis){
              window.speechSynthesis.cancel();
              self.speak('Stopped reading', true);
              console.log('⏹️ Stopped reading');
            }
            break;
            
          case '?':
            e.preventDefault();
            if(window.speechSynthesis){
              window.speechSynthesis.cancel();
            }
            self.speak('Keyboard shortcuts help. For navigation: Press M for menus, H for headings, B for buttons, F for forms, G for graphics, L for links. For reading content: Press P for paragraphs, T for text blocks, R to read all page content, or S to stop reading. Press question mark at any time to hear these instructions again.', true);
            console.log('❓ Announced help instructions');
            break;
            
          case 't':
            e.preventDefault();
            var textBlocks = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, li, td, th, blockquote, article, section, header');
            var textElements = [];
            
            for(var i = 0; i < textBlocks.length; i++){
              var elem = textBlocks[i];
              if(elem.closest('#accessibilityWidget') || elem.closest('#accessibilityTrigger')){
                continue;
              }
              var text = elem.textContent.trim();
              if(text && text.length > 20){
                textElements.push(elem);
              }
            }
            
            if(textElements.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % textElements.length;
              var textElem = textElements[self.currentFocusIndex];
              textElem.setAttribute('tabindex', '-1');
              textElem.focus();
              textElem.scrollIntoView({behavior: 'smooth', block: 'center'});
              var text = textElem.textContent.trim();
              if(text.length > 300){
                text = text.substring(0, 300) + '... continued';
              }
              
              var tagName = textElem.tagName.toLowerCase();
              if(['h1','h2','h3','h4','h5','h6'].indexOf(tagName) !== -1){
                var level = tagName.charAt(1);
                self.speak('Heading level ' + level + ': ' + text, true);
                console.log('📍 Reading heading:', text.substring(0, 50) + '...');
              } else {
                self.speak(text, true);
                console.log('📍 Reading text:', text.substring(0, 50) + '...');
              }
            }
            break;
            
          case 'f':
            e.preventDefault();
            var forms = document.querySelectorAll('form, input, textarea, select');
            if(forms.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % forms.length;
              var form = forms[self.currentFocusIndex];
              form.focus();
              form.scrollIntoView({behavior: 'smooth', block: 'center'});
              self.speak('Jumped to form element', true);
              console.log('📍 Jumped to form element');
            }
            break;
            
          case 'b':
            e.preventDefault();
            var buttons = document.querySelectorAll('button, [role="button"], input[type="submit"], input[type="button"]');
            if(buttons.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % buttons.length;
              var button = buttons[self.currentFocusIndex];
              button.focus();
              button.scrollIntoView({behavior: 'smooth', block: 'center'});
              var buttonText = button.textContent.trim() || button.getAttribute('aria-label') || 'unlabeled button';
              self.speak('Button: ' + buttonText, true);
              console.log('📍 Jumped to button');
            }
            break;
            
          case 'g':
            e.preventDefault();
            var graphics = document.querySelectorAll('img, svg, canvas, [role="img"]');
            if(graphics.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % graphics.length;
              var graphic = graphics[self.currentFocusIndex];
              graphic.setAttribute('tabindex', '-1');
              graphic.focus();
              graphic.scrollIntoView({behavior: 'smooth', block: 'center'});
              var altText = graphic.getAttribute('alt') || graphic.getAttribute('aria-label') || 'image';
              self.speak('Graphic: ' + altText, true);
              console.log('📍 Jumped to graphic');
            }
            break;
            
          case 'l':
            e.preventDefault();
            var links = document.querySelectorAll('a[href]');
            if(links.length > 0){
              self.currentFocusIndex = (self.currentFocusIndex + 1) % links.length;
              var link = links[self.currentFocusIndex];
              link.focus();
              link.scrollIntoView({behavior: 'smooth', block: 'center'});
              var linkText = link.textContent.trim() || link.getAttribute('aria-label') || 'unlabeled link';
              self.speak('Link: ' + linkText, true);
              console.log('📍 Jumped to link');
            }
            break;
        }
      };
      
      document.addEventListener('keydown', this.keyboardNavListener);
      
      this.showKeyboardShortcutsOverlay();
      
      if(this.screenReaderActive){
        setTimeout(function(){
          self.speak('Keyboard shortcuts are now active. Press M for menus, H for headings, B for buttons, F for forms, G for graphics, L for links. For reading content: Press P for paragraphs, T for text blocks, R to read all, or S to stop.', true);
        }, 1000);
      }
      
      console.log('✅ Keyboard navigation enabled');
      console.log('📋 Shortcuts: M (menus), H (headings), F (forms), B (buttons), G (graphics), L (links), P (paragraphs), T (text), R (read all), S (stop)');
    },

    removeKeyboardNavigation:function(){
      if(this.keyboardNavListener){
        document.removeEventListener('keydown', this.keyboardNavListener);
        this.keyboardNavListener = null;
      }
      
      this.hideKeyboardShortcutsOverlay();
      
      console.log('❌ Keyboard navigation disabled');
    },

    showKeyboardShortcutsOverlay:function(){
      var existingOverlay = document.getElementById('keyboard-shortcuts-overlay');
      if(existingOverlay){
        existingOverlay.remove();
      }
      
      var overlay = document.createElement('div');
      overlay.id = 'keyboard-shortcuts-overlay';
      overlay.innerHTML = 
        '<div class="keyboard-shortcuts-content">' +
          '<h3>⌨️ Keyboard Navigation Active</h3>' +
          '<div class="shortcuts-section">' +
            '<h4>Navigation</h4>' +
            '<p><strong>M</strong> - Jump to Menus</p>' +
            '<p><strong>H</strong> - Jump to Headings</p>' +
            '<p><strong>L</strong> - Jump to Links</p>' +
            '<p><strong>B</strong> - Jump to Buttons</p>' +
            '<p><strong>F</strong> - Jump to Forms</p>' +
            '<p><strong>G</strong> - Jump to Graphics</p>' +
          '</div>' +
          '<div class="shortcuts-section">' +
            '<h4>Reading Content</h4>' +
            '<p><strong>P</strong> - Read Next Paragraph</p>' +
            '<p><strong>T</strong> - Read Next Text Block</p>' +
            '<p><strong>R</strong> - Read All Content</p>' +
            '<p><strong>S</strong> - Stop Reading</p>' +
            '<p><strong>?</strong> - Hear Instructions Again</p>' +
          '</div>' +
          '<p class="shortcuts-note">Use Tab/Shift+Tab for normal navigation</p>' +
          '<button class="shortcuts-close">Got it!</button>' +
        '</div>';
      
      document.body.appendChild(overlay);
      
      overlay.querySelector('.shortcuts-close').addEventListener('click', function(){
        overlay.style.display = 'none';
      });
      
      setTimeout(function(){
        if(overlay && overlay.style.display !== 'none'){
          overlay.style.opacity = '0';
          setTimeout(function(){
            if(overlay){
              overlay.style.display = 'none';
            }
          }, 300);
        }
      }, 8000);
    },

    hideKeyboardShortcutsOverlay:function(){
      var overlay = document.getElementById('keyboard-shortcuts-overlay');
      if(overlay){
        overlay.remove();
      }
    },

    enhanceScreenReaderCompatibility:function(){
      console.log('🔊 Enhancing screen reader compatibility...');
      
      var images = document.querySelectorAll('img:not([alt]):not(#accessibilityWidget img):not(#accessibilityTrigger img)');
      images.forEach(function(img){
        img.setAttribute('alt', 'Image');
        img.setAttribute('role', 'img');
      });
      
      var links = document.querySelectorAll('a:not([aria-label]):not(#accessibilityWidget a):not(#accessibilityTrigger a)');
      links.forEach(function(link){
        if(!link.textContent.trim()){
          link.setAttribute('aria-label', 'Link');
        }
      });
      
      var buttons = document.querySelectorAll('button:not([aria-label]):not(#accessibilityWidget button):not(#accessibilityTrigger button)');
      buttons.forEach(function(button){
        if(!button.textContent.trim()){
          button.setAttribute('aria-label', 'Button');
        }
      });
      
      var main = document.querySelector('main:not(#accessibilityWidget):not(#accessibilityTrigger)');
      if(main && !main.getAttribute('role')){
        main.setAttribute('role', 'main');
      }
      
      var nav = document.querySelector('nav:not(#accessibilityWidget):not(#accessibilityTrigger)');
      if(nav && !nav.getAttribute('role')){
        nav.setAttribute('role', 'navigation');
      }
      
      var header = document.querySelector('header:not(#accessibilityWidget):not(#accessibilityTrigger)');
      if(header && !header.getAttribute('role')){
        header.setAttribute('role', 'banner');
      }
      
      var footer = document.querySelector('footer:not(#accessibilityWidget):not(#accessibilityTrigger)');
      if(footer && !footer.getAttribute('role')){
        footer.setAttribute('role', 'contentinfo');
      }
      
      console.log('✅ Screen reader enhancements applied');
    },

    removeScreenReaderEnhancements:function(){
      console.log('🔇 Removing screen reader enhancements...');
    },

    speak:function(text, interrupt){
      if(!this.screenReaderActive) return;
      
      if(!window.speechSynthesis){
        console.warn('⚠️ Speech synthesis not available in this browser');
        return;
      }
      
      if(interrupt){
        window.speechSynthesis.cancel();
      }
      
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';
      
      window.speechSynthesis.speak(utterance);
      
      console.log('🔊 Speaking:', text);
    },

    setupScreenReader:function(){
      var self = this;
      
      console.log('🔊 Setting up screen reader with audio...');
      
      this.screenReaderActive = true;
      
      setTimeout(function(){
        self.speak('Screen reader mode activated. Keyboard navigation enabled.', true);
        
        setTimeout(function(){
          self.speak('You now have complete access to all page content through audio. You can jump around the page using keyboard shortcuts: Press M for menus, H for headings, B for buttons, F for forms, G for graphics, and L for links. To read text content, press P for paragraphs, T for text blocks, or R to listen to everything on the page. Press S to stop reading at any time.', false);
        }, 3000);
      }, 500);
      
      this.addScreenReaderFocusListeners();
      
      this.addScreenReaderClickListeners();
      
      console.log('✅ Screen reader audio enabled');
    },

    addScreenReaderFocusListeners:function(){
      var self = this;
      
      var focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"]';
      
      document.addEventListener('focus', function(e){
        if(!self.screenReaderActive) return;
        
        var target = e.target;
        
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          return;
        }
        
        if(target.matches(focusableSelector)){
          var text = self.getElementDescription(target);
          if(text){
            self.speak(text, true);
          }
        }
      }, true);
      
      console.log('✅ Screen reader focus listeners added');
    },

    addScreenReaderClickListeners:function(){
      var self = this;
      
      document.addEventListener('click', function(e){
        if(!self.screenReaderActive) return;
        
        var target = e.target;
        
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          return;
        }
        
        if(target.matches('button, [role="button"], a, [onclick]')){
          var text = self.getElementDescription(target);
          if(text){
            self.speak('Clicked: ' + text, true);
          }
        }
      }, true);
      
      console.log('✅ Screen reader click listeners added');
    },

    getElementDescription:function(element){
      var description = '';
      
      var tagName = element.tagName.toLowerCase();
      var role = element.getAttribute('role');
      
      var text = element.getAttribute('aria-label') || 
                 element.getAttribute('title') || 
                 element.textContent.trim() ||
                 element.getAttribute('alt') ||
                 element.getAttribute('placeholder') ||
                 element.getAttribute('value');
      
      if(tagName === 'a'){
        description = 'Link: ' + (text || 'unlabeled link');
      } else if(tagName === 'button' || role === 'button'){
        description = 'Button: ' + (text || 'unlabeled button');
      } else if(tagName === 'input'){
        var type = element.getAttribute('type') || 'text';
        description = type.charAt(0).toUpperCase() + type.slice(1) + ' input: ' + (text || 'empty');
      } else if(tagName === 'textarea'){
        description = 'Text area: ' + (text || 'empty');
      } else if(tagName === 'select'){
        var selectedOption = element.options[element.selectedIndex];
        description = 'Dropdown: ' + (selectedOption ? selectedOption.text : text || 'no selection');
      } else if(tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6'){
        description = 'Heading level ' + tagName.charAt(1) + ': ' + text;
      } else if(text){
        description = text;
      }
      
      if(description.length > 200){
        description = description.substring(0, 200) + '... continued';
      }
      
      return description;
    },

    removeScreenReader:function(){
      console.log('🔇 Disabling screen reader audio...');
      
      this.screenReaderActive = false;
      
      if(window.speechSynthesis){
        window.speechSynthesis.cancel();
      }
      
      var self = this;
      setTimeout(function(){
        if(window.speechSynthesis){
          var utterance = new SpeechSynthesisUtterance('Screen reader mode deactivated');
          window.speechSynthesis.speak(utterance);
        }
      }, 100);
      
      console.log('✅ Screen reader audio disabled');
    },

    setupFocusTracking:function(){
      var self = this;
      
      console.log('🎯 Setting up focus tracking...');
      
      this.focusTrackingActive = true;
      
      var focusIndicator = document.getElementById('focus-indicator');
      if(!focusIndicator){
        focusIndicator = document.createElement('div');
        focusIndicator.id = 'focus-indicator';
        document.body.appendChild(focusIndicator);
      }
      
      if(this.focusTrackingListener){
        document.removeEventListener('focusin', this.focusTrackingListener, true);
      }
      
      this.focusTrackingListener = function(e){
        var target = e.target;
        
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          focusIndicator.classList.remove('active');
          return;
        }
        
        var elementInfo = '';
        var tagName = target.tagName.toLowerCase();
        
        if(tagName === 'a'){
          elementInfo = 'Link: ' + (target.textContent.trim() || 'No text');
        } else if(tagName === 'button' || target.getAttribute('role') === 'button'){
          elementInfo = 'Button: ' + (target.textContent.trim() || target.getAttribute('aria-label') || 'No label');
        } else if(tagName === 'input'){
          var type = target.getAttribute('type') || 'text';
          elementInfo = type.charAt(0).toUpperCase() + type.slice(1) + ' Input';
        } else if(tagName === 'textarea'){
          elementInfo = 'Text Area';
        } else if(tagName === 'select'){
          elementInfo = 'Dropdown';
        } else if(['h1','h2','h3','h4','h5','h6'].indexOf(tagName) !== -1){
          elementInfo = 'Heading ' + tagName.charAt(1);
        } else {
          elementInfo = tagName.charAt(0).toUpperCase() + tagName.slice(1);
        }
        
        console.log('🎯 Focus on:', elementInfo);
        
        focusIndicator.textContent = elementInfo;
        focusIndicator.classList.add('active');
        
        var rect = target.getBoundingClientRect();
        var top = rect.top - 45;
        var left = rect.left + (rect.width / 2);
        
        if(top < 10) top = rect.bottom + 10;
        if(left < 10) left = 10;
        if(left > window.innerWidth - 200) left = window.innerWidth - 200;
        
        focusIndicator.style.top = top + 'px';
        focusIndicator.style.left = left + 'px';
        focusIndicator.style.transform = 'translateX(-50%)';
        
        if(target.scrollIntoView){
          target.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
        
        setTimeout(function(){
          focusIndicator.classList.remove('active');
        }, 3000);
      };
      
      document.addEventListener('focusin', this.focusTrackingListener, true);
      
      document.addEventListener('focusout', function(){
        setTimeout(function(){
          if(!document.activeElement || document.activeElement === document.body){
            focusIndicator.classList.remove('active');
          }
        }, 100);
      }, true);
      
      console.log('✅ Focus tracking enabled - all focus changes will be highlighted with visual indicator');
    },

    removeFocusTracking:function(){
      console.log('❌ Removing focus tracking...');
      
      this.focusTrackingActive = false;
      
      if(this.focusTrackingListener){
        document.removeEventListener('focusin', this.focusTrackingListener, true);
        this.focusTrackingListener = null;
      }
      
      var focusIndicator = document.getElementById('focus-indicator');
      if(focusIndicator){
        focusIndicator.classList.remove('active');
      }
      
      console.log('✅ Focus tracking disabled');
    },

    readAllContent:function(){
      if(!this.screenReaderActive){
        console.warn('⚠️ Screen reader not active');
        return;
      }
      
      console.log('📖 Reading all page content...');
      
      if(window.speechSynthesis){
        window.speechSynthesis.cancel();
      }
      
      var contentElements = document.querySelectorAll(
        'header, h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, article, section, div'
      );
      
      var allText = [];
      
      for(var i = 0; i < contentElements.length; i++){
        var elem = contentElements[i];
        
        if(elem.closest('#accessibilityWidget') || elem.closest('#accessibilityTrigger')){
          continue;
        }
        
        var text = '';
        for(var j = 0; j < elem.childNodes.length; j++){
          var node = elem.childNodes[j];
          if(node.nodeType === 3){
            text += node.textContent.trim() + ' ';
          }
        }
        
        if(!text.trim() && elem.textContent.trim()){
          var hasReadableChildren = elem.querySelector('h1, h2, h3, h4, h5, h6, p, li');
          if(!hasReadableChildren){
            text = elem.textContent.trim();
          }
        }
        
        if(text.trim() && text.length > 10){
          var tagName = elem.tagName.toLowerCase();
          if(['h1','h2','h3','h4','h5','h6'].indexOf(tagName) !== -1){
            allText.push('Heading level ' + tagName.charAt(1) + ': ' + text.trim());
          } else if(tagName === 'li'){
            allText.push('List item: ' + text.trim());
          } else {
            allText.push(text.trim());
          }
        }
      }
      
      if(allText.length === 0){
        this.speak('No readable content found on this page', true);
        return;
      }
      
      this.speak('Reading all page content. Press S to stop.', true);
      
      var self = this;
      var currentIndex = 0;
      
      var readNext = function(){
        if(currentIndex >= allText.length){
          setTimeout(function(){
            self.speak('Finished reading page', true);
          }, 1000);
          return;
        }
        
        var text = allText[currentIndex];
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onend = function(){
          currentIndex++;
          setTimeout(readNext, 500);
        };
        
        utterance.onerror = function(e){
          console.error('Speech error:', e);
          currentIndex++;
          readNext();
        };
        
        window.speechSynthesis.speak(utterance);
      };
      
      setTimeout(readNext, 2000);
      
      console.log('📖 Reading ' + allText.length + ' content blocks');
    },

    setupWidgetFocusTrap:function(){
      var self = this;
      
      console.log('🔒 Setting up widget focus trap...');
      
      if(this.widgetFocusTrap){
        document.removeEventListener('keydown', this.widgetFocusTrap);
      }
      
      this.widgetFocusTrap = function(e){
        if(e.key !== 'Tab') return;
        if(!self.widget.classList.contains('accessibilityOpen')) return;
        
        var focusableElements = self.widget.querySelectorAll(
          'button:not([disabled]):not(.goog-te-combo):not([id^="google_translate"]), [tabindex]:not([tabindex="-1"]):not(.goog-te-combo):not([id^="google_translate"]), a[href]:not(.goog-te-combo):not([id^="google_translate"]), input:not([disabled]):not(.goog-te-combo):not([id^="google_translate"]), select:not([disabled]):not(.goog-te-combo):not([id^="google_translate"]), textarea:not([disabled]):not(.goog-te-combo):not([id^="google_translate"])'
        );
        
        if(focusableElements.length === 0) return;
        
        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];
        
        // Only trap focus if we're actually focused on widget elements
        var activeElement = document.activeElement;
        var isFocusedInWidget = self.widget.contains(activeElement);
        
        if(!isFocusedInWidget) return;
        
        if(e.shiftKey && document.activeElement === firstElement){
          e.preventDefault();
          lastElement.focus();
        } else if(!e.shiftKey && document.activeElement === lastElement){
          e.preventDefault();
          firstElement.focus();
        }
      };
      
      document.addEventListener('keydown', this.widgetFocusTrap);
      
      console.log('✅ Widget focus trap enabled');
    },

    removeWidgetFocusTrap:function(){
      if(this.widgetFocusTrap){
        document.removeEventListener('keydown', this.widgetFocusTrap);
        this.widgetFocusTrap = null;
      }
      
      console.log('🔓 Widget focus trap removed');
    },

    applyProfileEffect:function(id,active){
      console.log('📋 Applying profile:', id, 'Active:', active);
      document.body.classList.toggle('profile-'+id, active);
      
      if(id === 'vision'){
        if(active){
          document.documentElement.style.zoom = '1.25';
        } else {
          document.documentElement.style.zoom = '';
        }
      }
      
      if(id === 'adhd'){
        console.log('🎯 ADHD profile triggered! Active:', active);
        if(active){
          this.setupAdhdFocusListeners();
          this.adhdFocusActive = true;
        } else {
          this.removeAdhdFocusListeners();
          this.adhdFocusActive = false;
        }
      }
      
      if(id === 'motor'){
        console.log('⌨️ Keyboard Navigation profile triggered! Active:', active);
        if(active){
          this.setupKeyboardNavigation();
          this.keyboardNavActive = true;
          
          document.body.classList.add('profile-blind');
          var blindProfileEl = this.widget.querySelector('.profile[data-id="blind"]');
          if(blindProfileEl && !blindProfileEl.classList.contains('profile--active')){
            blindProfileEl.classList.add('profile--active');
            blindProfileEl.setAttribute('aria-checked', 'true');
            localStorage.setItem('blind', 'true');
            console.log('🔗 Auto-activated Screen Reader profile');
            
            this.setupScreenReader();
            this.enhanceScreenReaderCompatibility();
          }
        } else {
          this.removeKeyboardNavigation();
          this.keyboardNavActive = false;
          
          document.body.classList.remove('profile-blind');
          var blindProfileEl = this.widget.querySelector('.profile[data-id="blind"]');
          if(blindProfileEl && blindProfileEl.classList.contains('profile--active')){
            blindProfileEl.classList.remove('profile--active');
            blindProfileEl.setAttribute('aria-checked', 'false');
            localStorage.setItem('blind', 'false');
            console.log('🔗 Auto-deactivated Screen Reader profile');
            
            this.removeScreenReader();
            this.removeScreenReaderEnhancements();
          }
        }
      }
      
      if(id === 'blind'){
        console.log('👁️ Screen Reader profile triggered! Active:', active);
        if(active){
          this.setupScreenReader();
          this.enhanceScreenReaderCompatibility();
          
          document.body.classList.add('profile-motor');
          var motorProfileEl = this.widget.querySelector('.profile[data-id="motor"]');
          if(motorProfileEl && !motorProfileEl.classList.contains('profile--active')){
            motorProfileEl.classList.add('profile--active');
            motorProfileEl.setAttribute('aria-checked', 'true');
            localStorage.setItem('motor', 'true');
            console.log('🔗 Auto-activated Keyboard Navigation profile');
            
            if(!this.keyboardNavActive){
              this.setupKeyboardNavigation();
              this.keyboardNavActive = true;
            }
          }
        } else {
          this.removeScreenReader();
          this.removeScreenReaderEnhancements();
          
          document.body.classList.remove('profile-motor');
          var motorProfileEl = this.widget.querySelector('.profile[data-id="motor"]');
          if(motorProfileEl && motorProfileEl.classList.contains('profile--active')){
            motorProfileEl.classList.remove('profile--active');
            motorProfileEl.setAttribute('aria-checked', 'false');
            localStorage.setItem('motor', 'false');
            console.log('🔗 Auto-deactivated Keyboard Navigation profile');
            
            if(this.keyboardNavActive){
              this.removeKeyboardNavigation();
              this.keyboardNavActive = false;
            }
          }
        }
      }
    },
  
    applyActionEffect:function(id,value){
      var pageContent = document.querySelectorAll('body > *:not(#accessibilityWidget):not(#accessibilityTrigger)');
      
      switch(id){
        case 'zoom': 
          if(parseFloat(value) === 0) {
            document.documentElement.style.fontSize = '';
          } else {
            var zoomScale = 100 + parseFloat(value);
            document.documentElement.style.fontSize = zoomScale + '%';
          }
          break;
          
        case 'fontSize': 
          if(parseFloat(value) === 0) {
            pageContent.forEach(function(el){
              el.style.fontSize = '';
            });
          } else {
            var fontScale = 100 + parseFloat(value);
            pageContent.forEach(function(el){
              el.style.fontSize = fontScale + '%';
            });
          }
          break;
          
        case 'lineHeight': 
          if(parseFloat(value) === 0) {
            pageContent.forEach(function(el){
              el.style.lineHeight = '';
            });
          } else {
            pageContent.forEach(function(el){
              var computedStyle = window.getComputedStyle(el);
              var currentLineHeight = parseFloat(computedStyle.lineHeight);
              
              if(!isNaN(currentLineHeight)){
                var fontSize = parseFloat(computedStyle.fontSize);
                var lineHeightRatio = currentLineHeight / fontSize;
                var newLineHeight = lineHeightRatio * (1 + (parseFloat(value) / 100));
                el.style.lineHeight = newLineHeight;
              }
            });
          }
          break;
          
        case 'letterSpacing': 
          if(parseFloat(value) === 0) {
            pageContent.forEach(function(el){
              el.style.letterSpacing = '';
            });
          } else {
            var letterSpacing = parseFloat(value) / 1000;
            pageContent.forEach(function(el){
              el.style.letterSpacing = letterSpacing + 'em';
            });
          }
          break;
          
        case 'readableFont': 
          if(value) {
            document.body.classList.add('readable-font');
          } else {
            document.body.classList.remove('readable-font');
          }
          break;
          
        case 'emphasizeTitles':
          document.body.classList.toggle('emphasizeTitles', !!value);
          break;
          
        case 'emphasizeLinks':
          document.body.classList.toggle('emphasizeLinks', !!value);
          break;
          
        case 'magnifier':
          if(value){
            document.body.classList.add('magnifier');
            this.setupMagnifierListeners();
            this.magnifierActive = true;
          } else {
            document.body.classList.remove('magnifier');
            this.removeMagnifierListeners();
            this.magnifierActive = false;
          }
          break;
          
        case 'darkContrast':
          document.body.classList.toggle('dark-contrast',!!value);
          break;
          
        case 'lightContrast':
          document.body.classList.toggle('light-contrast',!!value);
          break;
          
        case 'highContrast':
          document.body.classList.toggle('high-contrast',!!value);
          break;
          
        case 'highSaturation':
          document.body.classList.toggle('high-saturation',!!value);
          break;
          
        case 'monochrome':
          document.body.classList.toggle('monochrome',!!value);
          break;
          
        case 'stopAnimations':
          document.body.classList.toggle('stop-animations',!!value);
          break;
          
        case 'bigBlackCursor':
          document.body.classList.toggle('big-black-cursor',!!value);
          break;
          
        case 'bigWhiteCursor':
          document.body.classList.toggle('big-white-cursor',!!value);
          break;
          
        case 'hideImages':
          document.body.classList.toggle('hideImages',!!value);
          break;
          
        case 'titleColor':
          if(value){
            document.body.style.setProperty('--titleColor', value);
          } else {
            document.body.style.removeProperty('--titleColor');
          }
          break;
          
        case 'textColor':
          if(value){
            document.body.style.setProperty('--textColor', value);
            document.body.classList.add('has-textColor');
          } else {
            document.body.style.removeProperty('--textColor');
            document.body.classList.remove('has-textColor');
          }
          break;
          
        case 'backgroundColor':
          if(value){
            document.body.style.setProperty('--backgroundColor', value);
            document.body.classList.add('has-backgroundColor');
          } else {
            document.body.style.removeProperty('--backgroundColor');
            document.body.classList.remove('has-backgroundColor');
          }
          break;
          
        case 'readMode':
          document.body.classList.toggle('read-mode', !!value);
          break;
          
        case 'readingGuide':
          if(value){
            document.body.classList.add('readingGuide');
            this.setupReadingGuideListeners();
            this.readingGuideActive = true;
          } else {
            document.body.classList.remove('readingGuide');
            this.removeReadingGuideListeners();
            this.readingGuideActive = false;
          }
          break;
          
        case 'emphasizeFocus':
          if(value){
            document.body.classList.add('emphasize-focus');
            this.setupFocusTracking();
          } else {
            document.body.classList.remove('emphasize-focus');
            this.removeFocusTracking();
          }
          break;
          
        case 'emphasizeHover':
          document.body.classList.toggle('emphasize-hover', !!value);
          break;
      }
    },
  
    restorePreferences:function(){
      var self = this;
      
      for(var i=0;i<PROFILES.length;i++){
        var p=PROFILES[i];
        var active=localStorage.getItem(p.id)==='true';
        var el=this.widget.querySelector('.profile[data-id="'+p.id+'"]');
        if(el && active){
          el.classList.add('profile--active');
          el.setAttribute('aria-checked', 'true');
          this.applyProfileEffect(p.id,true);
        }
      }
      
      for(var j=0;j<ACTIONS.length;j++){
        var a=ACTIONS[j];
        var el=this.widget.querySelector('.action-box[data-id="'+a.id+'"]');
        if(!el) continue;
        
        if(a.type==='toggle'){
          if(localStorage.getItem(a.id)==='true'){
            el.classList.add('action-box--active');
            this.applyActionEffect(a.id,true);
          }
        }
        
        if(a.type==='range'){
          var val=localStorage.getItem(a.id);
          if(val!==null){
            var numVal = parseFloat(val);
            el.querySelector('.range__base').innerText=numVal+'%';
            a.value=numVal;
            this.applyActionEffect(a.id,numVal);
          }
        }
        
        if(a.type==='color'){
          var val=localStorage.getItem(a.id);
          if(val){
            document.body.style.setProperty('--'+a.id,val);
            this.applyActionEffect(a.id,val);
          }
        }
      }
    },
  
    restoreLanguage:function(){
      var savedLang = localStorage.getItem('accessibility-language');
      if(savedLang && LANGUAGES[savedLang]){
        this.currentLanguage = savedLang;
        document.documentElement.setAttribute('lang', savedLang);
        
        var rtlLanguages = ['ar', 'he'];
        if(rtlLanguages.indexOf(savedLang) !== -1){
          document.documentElement.setAttribute('dir', 'rtl');
        } else {
          document.documentElement.setAttribute('dir', 'ltr');
        }
        
        var currentLanguageSpan = this.widget.querySelector('.current-language');
        var currentFlagSpan = this.widget.querySelector('.current-flag');
        if(currentLanguageSpan){
          currentLanguageSpan.textContent = LANGUAGES[savedLang].name;
        }
        if(currentFlagSpan){
          currentFlagSpan.textContent = LANGUAGES[savedLang].flag;
        }
        
        if(savedLang !== 'en'){
          var self = this;
          setTimeout(function(){
            self.triggerGoogleTranslate(savedLang);
          }, 2000);
        }
      }
    },
  
    changeLanguage:function(langCode, langName, langFlag){
      localStorage.setItem('accessibility-language', langCode);
      this.currentLanguage = langCode;
      
      document.documentElement.setAttribute('lang', langCode);
      
      var rtlLanguages = ['ar', 'he'];
      if(rtlLanguages.indexOf(langCode) !== -1){
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
      
      this.triggerGoogleTranslate(langCode);
      
      console.log('Language changed to:', langCode, langName, langFlag);
    },
  
    triggerGoogleTranslate:function(langCode){
      if(this.translating){
        console.log('⚠️ Translation already in progress');
        return;
      }
      
      this.translating = true;
      var self = this;
      var attempts = 0;
      var maxAttempts = 30;
      
      var checkInterval = setInterval(function(){
        attempts++;
        
        var selectElement = document.querySelector('select.goog-te-combo');
        
        if(selectElement){
          clearInterval(checkInterval);
          self.translating = false;
          
          if(selectElement.value === langCode){
            console.log('✅ Already in language:', langCode);
            return;
          }
          
          selectElement.value = langCode;
          
          selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          
          console.log('✅ Translated to:', langCode);
        } else if(attempts >= maxAttempts){
          clearInterval(checkInterval);
          self.translating = false;
          console.warn('⚠️ Google Translate not ready yet. Please wait a moment and try again.');
        }
      }, 200);
    },
  
    resetAllSettings:function(){
      var self = this;
      
      localStorage.clear();
      
      this.currentLanguage = 'en';
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      
      var currentLanguageSpan = this.widget.querySelector('.current-language');
      var currentFlagSpan = this.widget.querySelector('.current-flag');
      if(currentLanguageSpan){
        currentLanguageSpan.textContent = 'English (US)';
      }
      if(currentFlagSpan){
        currentFlagSpan.textContent = '🇺🇸';
      }
      
      this.triggerGoogleTranslate('en');
      
      for(var i = 0; i < PROFILES.length; i++){
        var p = PROFILES[i];
        document.body.classList.remove('profile-' + p.id);
        var profileEl = this.widget.querySelector('.profile[data-id="' + p.id + '"]');
        if(profileEl){
          profileEl.classList.remove('profile--active');
          profileEl.setAttribute('aria-checked', 'false');
        }
      }
      
      document.documentElement.style.zoom = '';
      
      var actionClasses = [
        'readable-font', 'emphasizeTitles', 'emphasizeLinks', 'magnifier',
        'dark-contrast', 'light-contrast', 'high-contrast', 'high-saturation',
        'monochrome', 'stop-animations', 'big-black-cursor', 'big-white-cursor',
        'hideImages', 'read-mode', 'readingGuide', 'emphasize-focus', 'emphasize-hover',
        'has-backgroundColor', 'has-textColor'
      ];
      
      for(var j = 0; j < actionClasses.length; j++){
        document.body.classList.remove(actionClasses[j]);
      }
      
      if(this.magnifierActive){
        this.removeMagnifierListeners();
        this.magnifierActive = false;
      }
      
      if(this.readingGuideActive){
        this.removeReadingGuideListeners();
        this.readingGuideActive = false;
      }
      
      if(this.adhdFocusActive){
        this.removeAdhdFocusListeners();
        this.adhdFocusActive = false;
      }
      
      if(this.keyboardNavActive){
        this.removeKeyboardNavigation();
        this.keyboardNavActive = false;
      }
      
      if(this.screenReaderActive){
        this.removeScreenReader();
        this.screenReaderActive = false;
      }
      
      if(this.focusTrackingActive){
        this.removeFocusTracking();
        this.focusTrackingActive = false;
      }
      
      var actionBoxes = this.widget.querySelectorAll('.action-box');
      for(var k = 0; k < actionBoxes.length; k++){
        actionBoxes[k].classList.remove('action-box--active');
      }
      
      var rangeBases = this.widget.querySelectorAll('.range__base');
      for(var l = 0; l < rangeBases.length; l++){
        rangeBases[l].textContent = '0%';
      }
      
      for(var m = 0; m < ACTIONS.length; m++){
        if(ACTIONS[m].type === 'range'){
          ACTIONS[m].value = 0;
        }
      }
      
      document.documentElement.style.fontSize = '';
      document.body.style.removeProperty('--titleColor');
      document.body.style.removeProperty('--textColor');
      document.body.style.removeProperty('--backgroundColor');
      
      var pageContent = document.querySelectorAll('body > *:not(#accessibilityWidget):not(#accessibilityTrigger)');
      pageContent.forEach(function(el){
        el.style.fontSize = '';
        el.style.lineHeight = '';
        el.style.letterSpacing = '';
      });
      
      console.log('✅ All accessibility settings have been reset');
    }
  };
  
  document.addEventListener('DOMContentLoaded',function(){ ACCESSIBILITY.init(); });
})();