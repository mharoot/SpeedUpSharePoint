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
  
  // NO TRANSLATIONS NEEDED - Google Translate does it all!
  
  // ---------------- ICONS ----------------
  var ICONS = {
    seizures:'fa-solid fa-brain',
    vision:'fa-solid fa-eye',
    adhd:'fa-solid fa-lightbulb',
    cognitive:'fa-solid fa-book',
    motor:'fa-solid fa-keyboard',
    blind:'fa-solid fa-wheelchair',
    zoom:'fa-solid fa-magnifying-glass-plus',
    readableFont:'fa-solid fa-font',
    emphasizeTitles:'fa-solid fa-heading',
    emphasizeLinks:'fa-solid fa-link',
    magnifier:'fa-solid fa-search',
    fontSize:'fa-solid fa-text-height',
    textAlign:'fa-solid fa-align-left',
    lineHeight:'fa-solid fa-arrows-up-down',
    letterSpacing:'fa-solid fa-text-width',
    darkContrast:'fa-solid fa-adjust',
    lightContrast:'fa-solid fa-sun',
    highContrast:'fa-solid fa-eye-dropper',
    highSaturation:'fa-solid fa-palette',
    monochrome:'fa-solid fa-circle-half-stroke',
    titleColor:'fa-solid fa-fill-drip',
    textColor:'fa-solid fa-palette',
    backgroundColor:'fa-solid fa-fill',
    mute:'fa-solid fa-volume-xmark',
    hideImages:'fa-solid fa-eye-slash',
    readMode:'fa-solid fa-book-open',
    readingGuide:'fa-solid fa-ruler',
    usefulLinks:'fa-solid fa-link',
    stopAnimations:'fa-solid fa-stopwatch',
    emphasizeHover:'fa-solid fa-hand-pointer',
    emphasizeFocus:'fa-solid fa-crosshairs',
    bigBlackCursor:'fa-solid fa-mouse',
    bigWhiteCursor:'fa-solid fa-mouse-pointer'
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
      // Store original computed line-height
      this.originalLineHeight = window.getComputedStyle(document.body).lineHeight;
      
      // Create filter wrapper for contrast effects
      this.createFilterWrapper();
      
      this.createTrigger();
      this.createWidget();
      this.createMagnifierPopup();
      this.restorePreferences();
      this.restoreLanguage();
      
      // Initialize Google Translate AFTER widget is created
      this.initializeGoogleTranslate();
    },
  
    // ---------------- CREATE FILTER WRAPPER ----------------
    createFilterWrapper:function(){
      // Create a wrapper div that will hold all body content except widget/trigger
      var wrapper = document.createElement('div');
      wrapper.id = 'accessibility-filter-wrapper';
      
      // Move all existing body children into wrapper
      while(document.body.firstChild){
        wrapper.appendChild(document.body.firstChild);
      }
      
      // Add wrapper back to body
      document.body.appendChild(wrapper);
    },
  
    // ---------------- INITIALIZE GOOGLE TRANSLATE ----------------
    initializeGoogleTranslate:function(){
      // Create container
      var container = document.createElement('div');
      container.id = 'google_translate_element';
      container.style.display = 'none';
      document.body.appendChild(container);
      
      // Load script
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      
      // Define init function
      window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
        
        console.log('✅ Google Translate loaded successfully');
      };
      
      document.head.appendChild(script);
    },
  
    createTrigger:function(){
      var trigger = document.createElement('div');
      trigger.id='accessibilityTrigger';
      trigger.className='accessibility-no-scale';
      trigger.setAttribute('role', 'button');
      trigger.setAttribute('aria-label', 'Open accessibility settings');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('tabindex', '0');
      trigger.innerHTML='<i class="fa-solid fa-wheelchair fa-lg" aria-hidden="true"></i>';
      document.body.appendChild(trigger);
      
      var self=this;
      
      // Click handler
      trigger.addEventListener('click', function(){ 
        var isOpen = self.widget.classList.toggle('accessibilityOpen');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        trigger.setAttribute('aria-label', isOpen ? 'Close accessibility settings' : 'Open accessibility settings');
        
        if(isOpen){
          self.setupWidgetFocusTrap();
          // Focus first element in widget (close button)
          setTimeout(function(){
            var firstFocusable = self.widget.querySelector('.accessibilityClose');
            if(firstFocusable) firstFocusable.focus();
          }, 100);
        } else {
          self.removeWidgetFocusTrap();
        }
      });
      
      // Keyboard handler (Enter or Space)
      trigger.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          var isOpen = self.widget.classList.toggle('accessibilityOpen');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          trigger.setAttribute('aria-label', isOpen ? 'Close accessibility settings' : 'Open accessibility settings');
          
          if(isOpen){
            self.setupWidgetFocusTrap();
            // Focus first element in widget (close button)
            setTimeout(function(){
              var firstFocusable = self.widget.querySelector('.accessibilityClose');
              if(firstFocusable) firstFocusable.focus();
            }, 100);
          } else {
            self.removeWidgetFocusTrap();
          }
        }
      });
    },
  
    // ---------------- CREATE MAGNIFIER POPUP ----------------
    createMagnifierPopup:function(){
      this.magnifierPopup = document.createElement('div');
      this.magnifierPopup.id = 'text-magnifier-popup';
      document.body.appendChild(this.magnifierPopup);
    },
  
    // ---------------- SETUP MAGNIFIER LISTENERS ----------------
    setupMagnifierListeners:function(){
      var self = this;
      var popup = this.magnifierPopup;
      
      // Remove old listeners if they exist
      if(this.magnifierMouseMove){
        document.removeEventListener('mousemove', this.magnifierMouseMove);
      }
      if(this.magnifierMouseOut){
        document.removeEventListener('mouseout', this.magnifierMouseOut);
      }
      
      // Define listeners
      this.magnifierMouseMove = function(e){
        var target = e.target;
        
        // Skip if hovering over widget or trigger
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger') || target.closest('#text-magnifier-popup')){
          popup.classList.remove('active');
          return;
        }
        
        // Only show for text elements
        var textElements = 'h1,h2,h3,h4,h5,h6,p,span,a,li,label,strong,em,b,td,th,div';
        if(!target.matches(textElements)){
          popup.classList.remove('active');
          return;
        }
        
        // Get text content
        var text = target.textContent.trim();
        if(!text || text.length === 0){
          popup.classList.remove('active');
          return;
        }
        
        // Limit text length
        if(text.length > 300){
          text = text.substring(0, 300) + '...';
        }
        
        // Update popup content
        popup.textContent = text;
        popup.classList.add('active');
        
        // Position popup near cursor
        var x = e.clientX;
        var y = e.clientY;
        
        // Offset from cursor
        var offsetX = 20;
        var offsetY = 20;
        
        // Check if popup would go off screen
        var popupRect = popup.getBoundingClientRect();
        var viewportWidth = window.innerWidth;
        var viewportHeight = window.innerHeight;
        
        // Adjust position to stay on screen
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
        // Hide popup when mouse leaves the page
        if(e.relatedTarget === null){
          popup.classList.remove('active');
        }
      };
      
      // Add listeners
      document.addEventListener('mousemove', this.magnifierMouseMove);
      document.addEventListener('mouseout', this.magnifierMouseOut);
    },
  
    // ---------------- REMOVE MAGNIFIER LISTENERS ----------------
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
  
    // ---------------- SETUP READING GUIDE LISTENERS ----------------
    setupReadingGuideListeners:function(){
      var self = this;
      
      // Remove old listener if it exists
      if(this.readingGuideMouseMove){
        document.removeEventListener('mousemove', this.readingGuideMouseMove);
      }
      
      // Create CSS rule for reading guide position
      var styleId = 'reading-guide-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
      
      var style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      
      // Define listener
      this.readingGuideMouseMove = function(e){
        var x = e.clientX;
        var y = e.clientY;
        
        // Update the position of both lines to follow mouse
        if(style.sheet){
          // Clear existing rules
          while(style.sheet.cssRules.length > 0){
            style.sheet.deleteRule(0);
          }
          
          // Add new rules with current mouse position
          style.sheet.insertRule('body.readingGuide::after { top: ' + y + 'px !important; left: ' + x + 'px !important; }', 0);
          style.sheet.insertRule('body.readingGuide::before { top: ' + y + 'px !important; left: ' + x + 'px !important; }', 1);
        }
      };
      
      // Add listener
      document.addEventListener('mousemove', this.readingGuideMouseMove);
    },
  
    // ---------------- REMOVE READING GUIDE LISTENERS ----------------
    removeReadingGuideListeners:function(){
      if(this.readingGuideMouseMove){
        document.removeEventListener('mousemove', this.readingGuideMouseMove);
      }
      
      // Remove the style element
      var styleId = 'reading-guide-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
    },
  
    // ---------------- SETUP ADHD FOCUS LISTENERS ----------------
    setupAdhdFocusListeners:function(){
      var self = this;
      
      console.log('🎯 Setting up ADHD focus listeners...');
      
      // Remove old listener if it exists
      if(this.adhdFocusMouseMove){
        document.removeEventListener('mousemove', this.adhdFocusMouseMove);
      }
      
      // Create CSS rule for ADHD focus window position
      var styleId = 'adhd-focus-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
      
      var style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
      
      console.log('✅ Style element created');
      
      // Define listener
      this.adhdFocusMouseMove = function(e){
        var y = e.clientY;
        var focusHeight = 175;
        var halfHeight = focusHeight / 2;
        
        // Calculate the top and bottom of the focus window
        var focusTop = Math.max(0, y - halfHeight);
        var focusBottom = Math.min(window.innerHeight, y + halfHeight);
        
        // Update the clip-path to cut out the focus area from the overlay
        if(style.sheet){
          // Clear existing rules
          while(style.sheet.cssRules.length > 0){
            style.sheet.deleteRule(0);
          }
          
          // Create clip-path that covers everything EXCEPT the focus window
          // This creates a "hole" in the overlay where the user can see clearly
          var clipPath = 'polygon(' +
            '0% 0%, ' +                    // Top-left corner
            '100% 0%, ' +                  // Top-right corner
            '100% ' + focusTop + 'px, ' +  // Right side down to focus top
            '0% ' + focusTop + 'px, ' +    // Left side at focus top
            '0% ' + focusBottom + 'px, ' + // Left side at focus bottom (creates the hole)
            '100% ' + focusBottom + 'px, ' + // Right side at focus bottom
            '100% 100%, ' +                // Right side to bottom
            '0% 100%' +                    // Bottom-left corner
          ')';
          
          style.sheet.insertRule('body.profile-adhd::before { clip-path: ' + clipPath + ' !important; }', 0);
        }
      };
      
      // Add listener
      document.addEventListener('mousemove', this.adhdFocusMouseMove);
      
      // Trigger once to set initial position
      var initialEvent = {clientY: window.innerHeight / 2};
      this.adhdFocusMouseMove(initialEvent);
      
      console.log('✅ Mouse move listener added');
    },
  
    // ---------------- REMOVE ADHD FOCUS LISTENERS ----------------
    removeAdhdFocusListeners:function(){
      if(this.adhdFocusMouseMove){
        document.removeEventListener('mousemove', this.adhdFocusMouseMove);
      }
      
      // Remove the style element
      var styleId = 'adhd-focus-style';
      var existingStyle = document.getElementById(styleId);
      if(existingStyle){
        existingStyle.remove();
      }
    },
  
    // ---------------- SETUP KEYBOARD NAVIGATION ----------------
    setupKeyboardNavigation:function(){
      var self = this;
      
      console.log('⌨️ Setting up keyboard navigation...');
      
      // Remove old listener if it exists
      if(this.keyboardNavListener){
        document.removeEventListener('keydown', this.keyboardNavListener);
      }
      
      // Define keyboard shortcuts
      this.keyboardNavListener = function(e){
        // Ignore if typing in input fields
        if(e.target.matches('input, textarea, select, [contenteditable]')){
          return;
        }
        
        var key = e.key.toLowerCase();
        
        switch(key){
          case 'm':
            // Jump to menus/navigation
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
            // Jump to next heading
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
            // Jump to next paragraph and READ IT
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
            // Read all content from current position
            e.preventDefault();
            self.readAllContent();
            break;
            
          case 's':
            // Stop reading
            e.preventDefault();
            if(window.speechSynthesis){
              window.speechSynthesis.cancel();
              self.speak('Stopped reading', true);
              console.log('⏹️ Stopped reading');
            }
            break;
            
          case '?':
            // Help - repeat instructions
            e.preventDefault();
            if(window.speechSynthesis){
              window.speechSynthesis.cancel();
            }
            self.speak('Keyboard shortcuts help. For navigation: Press M for menus, H for headings, B for buttons, F for forms, G for graphics, L for links. For reading content: Press P for paragraphs, T for text blocks, R to read all page content, or S to stop reading. Press question mark at any time to hear these instructions again.', true);
            console.log('❓ Announced help instructions');
            break;
            
          case 't':
            // Jump to next text block (paragraphs, divs with text, spans with text)
            e.preventDefault();
            var textBlocks = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, div, span, li, td, th, blockquote, article, section, header');
            var textElements = [];
            
            // Filter to only elements with direct text content
            for(var i = 0; i < textBlocks.length; i++){
              var elem = textBlocks[i];
              // Skip widget elements
              if(elem.closest('#accessibilityWidget') || elem.closest('#accessibilityTrigger')){
                continue;
              }
              // Check if element has text
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
              // Limit spoken text length
              if(text.length > 300){
                text = text.substring(0, 300) + '... continued';
              }
              
              // Add context for headings
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
            // Jump to next form
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
            // Jump to next button
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
            // Jump to next graphic/image
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
            // Jump to next link
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
      
      // Add listener
      document.addEventListener('keydown', this.keyboardNavListener);
      
      // Show keyboard shortcuts overlay
      this.showKeyboardShortcutsOverlay();
      
      // Announce shortcuts via audio if screen reader is active
      if(this.screenReaderActive){
        setTimeout(function(){
          self.speak('Keyboard shortcuts are now active. Press M for menus, H for headings, B for buttons, F for forms, G for graphics, L for links. For reading content: Press P for paragraphs, T for text blocks, R to read all, or S to stop.', true);
        }, 1000);
      }
      
      console.log('✅ Keyboard navigation enabled');
      console.log('📋 Shortcuts: M (menus), H (headings), F (forms), B (buttons), G (graphics), L (links), P (paragraphs), T (text), R (read all), S (stop)');
    },
  
    // ---------------- REMOVE KEYBOARD NAVIGATION ----------------
    removeKeyboardNavigation:function(){
      if(this.keyboardNavListener){
        document.removeEventListener('keydown', this.keyboardNavListener);
        this.keyboardNavListener = null;
      }
      
      // Remove shortcuts overlay
      this.hideKeyboardShortcutsOverlay();
      
      console.log('❌ Keyboard navigation disabled');
    },
  
    // ---------------- SHOW KEYBOARD SHORTCUTS OVERLAY ----------------
    showKeyboardShortcutsOverlay:function(){
      // Remove existing overlay if present
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
      
      // Close button
      overlay.querySelector('.shortcuts-close').addEventListener('click', function(){
        overlay.style.display = 'none';
      });
      
      // Auto-hide after 8 seconds (longer since there's more content)
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
  
    // ---------------- HIDE KEYBOARD SHORTCUTS OVERLAY ----------------
    hideKeyboardShortcutsOverlay:function(){
      var overlay = document.getElementById('keyboard-shortcuts-overlay');
      if(overlay){
        overlay.remove();
      }
    },
  
    // ---------------- ENHANCE SCREEN READER COMPATIBILITY ----------------
    enhanceScreenReaderCompatibility:function(){
      console.log('🔊 Enhancing screen reader compatibility...');
      
      // Add ARIA labels to images without alt text
      var images = document.querySelectorAll('img:not([alt]):not(#accessibilityWidget img):not(#accessibilityTrigger img)');
      images.forEach(function(img){
        img.setAttribute('alt', 'Image');
        img.setAttribute('role', 'img');
      });
      
      // Add ARIA labels to links without text
      var links = document.querySelectorAll('a:not([aria-label]):not(#accessibilityWidget a):not(#accessibilityTrigger a)');
      links.forEach(function(link){
        if(!link.textContent.trim()){
          link.setAttribute('aria-label', 'Link');
        }
      });
      
      // Add ARIA labels to buttons without text
      var buttons = document.querySelectorAll('button:not([aria-label]):not(#accessibilityWidget button):not(#accessibilityTrigger button)');
      buttons.forEach(function(button){
        if(!button.textContent.trim()){
          button.setAttribute('aria-label', 'Button');
        }
      });
      
      // Add role and aria-label to main content areas
      var main = document.querySelector('main:not(#accessibilityWidget):not(#accessibilityTrigger)');
      if(main && !main.getAttribute('role')){
        main.setAttribute('role', 'main');
      }
      
      // Add landmarks if missing
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
  
    // ---------------- REMOVE SCREEN READER ENHANCEMENTS ----------------
    removeScreenReaderEnhancements:function(){
      console.log('🔇 Removing screen reader enhancements...');
      // Note: We don't remove ARIA labels as they don't hurt when profile is off
      // and removing them could break existing accessibility
    },
  
    // ---------------- SPEAK TEXT (TEXT-TO-SPEECH) ----------------
    speak:function(text, interrupt){
      if(!this.screenReaderActive) return;
      
      // Check if speech synthesis is available
      if(!window.speechSynthesis){
        console.warn('⚠️ Speech synthesis not available in this browser');
        return;
      }
      
      // Cancel current speech if interrupt is true
      if(interrupt){
        window.speechSynthesis.cancel();
      }
      
      // Create utterance
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-US';
      
      // Speak
      window.speechSynthesis.speak(utterance);
      
      console.log('🔊 Speaking:', text);
    },
  
    // ---------------- SETUP SCREEN READER ----------------
    setupScreenReader:function(){
      var self = this;
      
      console.log('🔊 Setting up screen reader with audio...');
      
      this.screenReaderActive = true;
      
      // Announce activation with full instructions
      setTimeout(function(){
        self.speak('Screen reader mode activated. Keyboard navigation enabled.', true);
        
        // Wait for first announcement to finish, then give instructions
        setTimeout(function(){
          self.speak('You now have complete access to all page content through audio. You can jump around the page using keyboard shortcuts: Press M for menus, H for headings, B for buttons, F for forms, G for graphics, and L for links. To read text content, press P for paragraphs, T for text blocks, or R to listen to everything on the page. Press S to stop reading at any time.', false);
        }, 3000);
      }, 500);
      
      // Add focus listeners to all interactive elements
      this.addScreenReaderFocusListeners();
      
      // Add click listeners to announce clicks
      this.addScreenReaderClickListeners();
      
      console.log('✅ Screen reader audio enabled');
    },
  
    // ---------------- ADD SCREEN READER FOCUS LISTENERS ----------------
    addScreenReaderFocusListeners:function(){
      var self = this;
      
      // Get all focusable elements
      var focusableSelector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"]';
      
      // Add focus listener to document for event delegation
      document.addEventListener('focus', function(e){
        if(!self.screenReaderActive) return;
        
        var target = e.target;
        
        // Skip if it's the widget or trigger
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          return;
        }
        
        // Check if target matches focusable elements
        if(target.matches(focusableSelector)){
          var text = self.getElementDescription(target);
          if(text){
            self.speak(text, true);
          }
        }
      }, true);
      
      console.log('✅ Screen reader focus listeners added');
    },
  
    // ---------------- ADD SCREEN READER CLICK LISTENERS ----------------
    addScreenReaderClickListeners:function(){
      var self = this;
      
      document.addEventListener('click', function(e){
        if(!self.screenReaderActive) return;
        
        var target = e.target;
        
        // Skip if it's the widget or trigger
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          return;
        }
        
        // Announce clicks on interactive elements
        if(target.matches('button, [role="button"], a, [onclick]')){
          var text = self.getElementDescription(target);
          if(text){
            self.speak('Clicked: ' + text, true);
          }
        }
      }, true);
      
      console.log('✅ Screen reader click listeners added');
    },
  
    // ---------------- GET ELEMENT DESCRIPTION FOR SCREEN READER ----------------
    getElementDescription:function(element){
      var description = '';
      
      // Get element type
      var tagName = element.tagName.toLowerCase();
      var role = element.getAttribute('role');
      
      // Get text content
      var text = element.getAttribute('aria-label') || 
                 element.getAttribute('title') || 
                 element.textContent.trim() ||
                 element.getAttribute('alt') ||
                 element.getAttribute('placeholder') ||
                 element.getAttribute('value');
      
      // Build description
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
      
      // Limit length
      if(description.length > 200){
        description = description.substring(0, 200) + '... continued';
      }
      
      return description;
    },
  
    // ---------------- REMOVE SCREEN READER ----------------
    removeScreenReader:function(){
      console.log('🔇 Disabling screen reader audio...');
      
      this.screenReaderActive = false;
      
      // Stop any ongoing speech
      if(window.speechSynthesis){
        window.speechSynthesis.cancel();
      }
      
      // Announce deactivation
      var self = this;
      setTimeout(function(){
        if(window.speechSynthesis){
          var utterance = new SpeechSynthesisUtterance('Screen reader mode deactivated');
          window.speechSynthesis.speak(utterance);
        }
      }, 100);
      
      console.log('✅ Screen reader audio disabled');
    },
  
    // ---------------- SETUP FOCUS TRACKING ----------------
    setupFocusTracking:function(){
      var self = this;
      
      console.log('🎯 Setting up focus tracking...');
      
      this.focusTrackingActive = true;
      
      // Create focus indicator tooltip
      var focusIndicator = document.getElementById('focus-indicator');
      if(!focusIndicator){
        focusIndicator = document.createElement('div');
        focusIndicator.id = 'focus-indicator';
        document.body.appendChild(focusIndicator);
      }
      
      // Remove old listener if exists
      if(this.focusTrackingListener){
        document.removeEventListener('focusin', this.focusTrackingListener, true);
      }
      
      // Add focus tracking listener
      this.focusTrackingListener = function(e){
        var target = e.target;
        
        // Skip widget and trigger
        if(target.closest('#accessibilityWidget') || target.closest('#accessibilityTrigger')){
          focusIndicator.classList.remove('active');
          return;
        }
        
        // Get element description
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
        
        // Log focus for debugging
        console.log('🎯 Focus on:', elementInfo);
        
        // Show focus indicator
        focusIndicator.textContent = elementInfo;
        focusIndicator.classList.add('active');
        
        // Position indicator near focused element
        var rect = target.getBoundingClientRect();
        var top = rect.top - 45;
        var left = rect.left + (rect.width / 2);
        
        // Keep on screen
        if(top < 10) top = rect.bottom + 10;
        if(left < 10) left = 10;
        if(left > window.innerWidth - 200) left = window.innerWidth - 200;
        
        focusIndicator.style.top = top + 'px';
        focusIndicator.style.left = left + 'px';
        focusIndicator.style.transform = 'translateX(-50%)';
        
        // Ensure element is visible
        if(target.scrollIntoView){
          target.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'});
        }
        
        // Auto-hide after 3 seconds
        setTimeout(function(){
          focusIndicator.classList.remove('active');
        }, 3000);
      };
      
      document.addEventListener('focusin', this.focusTrackingListener, true);
      
      // Hide indicator when focus is lost
      document.addEventListener('focusout', function(){
        setTimeout(function(){
          if(!document.activeElement || document.activeElement === document.body){
            focusIndicator.classList.remove('active');
          }
        }, 100);
      }, true);
      
      console.log('✅ Focus tracking enabled - all focus changes will be highlighted with visual indicator');
    },
  
    // ---------------- REMOVE FOCUS TRACKING ----------------
    removeFocusTracking:function(){
      console.log('❌ Removing focus tracking...');
      
      this.focusTrackingActive = false;
      
      if(this.focusTrackingListener){
        document.removeEventListener('focusin', this.focusTrackingListener, true);
        this.focusTrackingListener = null;
      }
      
      // Remove focus indicator
      var focusIndicator = document.getElementById('focus-indicator');
      if(focusIndicator){
        focusIndicator.classList.remove('active');
      }
      
      console.log('✅ Focus tracking disabled');
    },
  
    // ---------------- READ ALL CONTENT ----------------
    readAllContent:function(){
      if(!this.screenReaderActive){
        console.warn('⚠️ Screen reader not active');
        return;
      }
      
      console.log('📖 Reading all page content...');
      
      // Stop any current speech
      if(window.speechSynthesis){
        window.speechSynthesis.cancel();
      }
      
      // Get all readable content
      var contentElements = document.querySelectorAll(
        'header, h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, article, section, div'
      );
      
      var allText = [];
      
      for(var i = 0; i < contentElements.length; i++){
        var elem = contentElements[i];
        
        // Skip widget and trigger
        if(elem.closest('#accessibilityWidget') || elem.closest('#accessibilityTrigger')){
          continue;
        }
        
        // Get direct text content (not nested elements)
        var text = '';
        for(var j = 0; j < elem.childNodes.length; j++){
          var node = elem.childNodes[j];
          if(node.nodeType === 3){ // Text node
            text += node.textContent.trim() + ' ';
          }
        }
        
        // If no direct text, get all text (for elements that only have text in children)
        if(!text.trim() && elem.textContent.trim()){
          // Only include if element doesn't have other readable children
          var hasReadableChildren = elem.querySelector('h1, h2, h3, h4, h5, h6, p, li');
          if(!hasReadableChildren){
            text = elem.textContent.trim();
          }
        }
        
        if(text.trim() && text.length > 10){
          // Add element type for context
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
      
      // Announce start
      this.speak('Reading all page content. Press S to stop.', true);
      
      // Read all content with pauses
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
          setTimeout(readNext, 500); // Pause between sections
        };
        
        utterance.onerror = function(e){
          console.error('Speech error:', e);
          currentIndex++;
          readNext();
        };
        
        window.speechSynthesis.speak(utterance);
      };
      
      // Start reading after announcement
      setTimeout(readNext, 2000);
      
      console.log('📖 Reading ' + allText.length + ' content blocks');
    },
  
    // ---------------- SETUP WIDGET FOCUS TRAP ----------------
    setupWidgetFocusTrap:function(){
      var self = this;
      
      console.log('🔒 Setting up widget focus trap...');
      
      // Remove old listener if exists
      if(this.widgetFocusTrap){
        document.removeEventListener('keydown', this.widgetFocusTrap);
      }
      
      this.widgetFocusTrap = function(e){
        if(e.key !== 'Tab') return;
        if(!self.widget.classList.contains('accessibilityOpen')) return;
        
        // Get all focusable elements in widget
        var focusableElements = self.widget.querySelectorAll(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
        );
        
        if(focusableElements.length === 0) return;
        
        var firstElement = focusableElements[0];
        var lastElement = focusableElements[focusableElements.length - 1];
        
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
  
    // ---------------- REMOVE WIDGET FOCUS TRAP ----------------
    removeWidgetFocusTrap:function(){
      if(this.widgetFocusTrap){
        document.removeEventListener('keydown', this.widgetFocusTrap);
        this.widgetFocusTrap = null;
      }
      
      console.log('🔓 Widget focus trap removed');
    },
  
    createWidget:function(){
      var self=this;
      this.widget = document.createElement('div');
      this.widget.id='accessibilityWidget';
      this.widget.className='accessibility-no-scale';
      this.widget.style.maxWidth='550px';
      this.widget.style.width='95%';
      this.widget.innerHTML=
        '<div class="accessibilityClose" role="button" tabindex="0" aria-label="Close accessibility settings"><i class="fa-solid fa-xmark" aria-hidden="true"></i></div>'+
        '<div class="accessibilityHeader">'+
          '<div class="language-dropdown">'+
            '<button class="language-dropdown__button"><span class="current-flag">🇺🇸</span> <span class="current-language">English (US)</span> <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>'+
            '<div class="language-dropdown__menu"></div>'+
          '</div>'+
          '<div class="reset-button">'+
            '<button class="reset-button__btn"><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Reset</button>'+
          '</div>'+
          '<span class="accessibilityHeader__title">Accessibility</span>'+
        '</div>'+
        '<div class="accessibilityContent"></div>';
      document.body.appendChild(this.widget);
  
      // Close button
      var closeBtn = this.widget.querySelector('.accessibilityClose');
      closeBtn.addEventListener('click', function(){ 
        self.widget.classList.remove('accessibilityOpen');
        self.removeWidgetFocusTrap();
        // Update trigger ARIA state
        var trigger = document.getElementById('accessibilityTrigger');
        if(trigger){
          trigger.setAttribute('aria-expanded', 'false');
          trigger.setAttribute('aria-label', 'Open accessibility settings');
          // Return focus to trigger
          trigger.focus();
        }
      });
      
      // Keyboard support for close button
      closeBtn.addEventListener('keydown', function(e){
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          self.widget.classList.remove('accessibilityOpen');
          self.removeWidgetFocusTrap();
          // Update trigger ARIA state
          var trigger = document.getElementById('accessibilityTrigger');
          if(trigger){
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-label', 'Open accessibility settings');
            // Return focus to trigger
            trigger.focus();
          }
        }
      });
  
      // Escape key to close widget
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && self.widget.classList.contains('accessibilityOpen')){
          e.preventDefault();
          self.widget.classList.remove('accessibilityOpen');
          self.removeWidgetFocusTrap();
          var trigger = document.getElementById('accessibilityTrigger');
          if(trigger){
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('aria-label', 'Open accessibility settings');
            trigger.focus();
          }
        }
      });
  
      // Reset button
      this.widget.querySelector('.reset-button__btn').addEventListener('click', function(){
        if(confirm('Are you sure you want to reset all accessibility settings? This will restore defaults and return to English.')){
          self.resetAllSettings();
        }
      });
  
      // Language dropdown
      var languageButton = this.widget.querySelector('.language-dropdown__button');
      var languageMenu = this.widget.querySelector('.language-dropdown__menu');
      var currentLanguageSpan = this.widget.querySelector('.current-language');
      var currentFlagSpan = this.widget.querySelector('.current-flag');
      
      // Populate language menu
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
  
      // Toggle language dropdown
      languageButton.addEventListener('click', function(e){
        e.stopPropagation();
        languageMenu.classList.toggle('language-dropdown__menu--open');
      });
  
      // Close dropdown when clicking outside
      document.addEventListener('click', function(){
        languageMenu.classList.remove('language-dropdown__menu--open');
      });
  
      var content=this.widget.querySelector('.accessibilityContent');
  
      // ---- PROFILES ----
      var profilesContainer = document.createElement('div');
      profilesContainer.className='profiles-container';
      for(var i=0;i<PROFILES.length;i++){
        var p=PROFILES[i];
        var div = document.createElement('div');
        div.className='profile'+(p.active?' profile--active':'');
        div.tabIndex=0;
        div.dataset.id=p.id;
        div.setAttribute('role', 'switch');
        div.setAttribute('aria-checked', p.active ? 'true' : 'false');
        
        // Check if this profile is connected to another
        var isConnected = (p.id === 'motor' || p.id === 'blind');
        var connectedIcon = isConnected ? '<div class="profile-connected-icon" title="This profile works together with ' + (p.id === 'motor' ? 'Screen Reader' : 'Keyboard Navigation') + '"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1075 1024"><path d="M305.308 144.2c-145.386 0-263.245 117.859-263.245 263.245v26.139c0 130.952 106.156 237.105 237.107 237.105V562.421c-71.154 0-128.836-57.683-128.836-128.838v-26.139c0-85.591 69.385-154.975 154.975-154.975h209.109c85.591 0 154.977 69.385 154.977 154.975S600.009 562.42 514.418 562.42H501.35v108.268h13.068c145.388 0 263.245-117.857 263.245-263.244S659.806 144.199 514.418 144.199H305.309zm133.424 472.345c0-85.591 69.385-154.976 154.973-154.976h26.143v-108.27h-26.143c-145.385 0-263.244 117.859-263.244 263.246S448.32 879.79 593.705 879.79h209.111c145.388 0 263.245-117.857 263.245-263.245v-13.071c0-138.167-112.005-250.174-250.173-250.174v108.27c78.372 0 141.906 63.533 141.906 141.904v13.071c0 85.591-69.386 154.977-154.977 154.977H593.706c-85.589 0-154.973-69.386-154.973-154.977z"/></svg></div>' : '';
        
        div.innerHTML=
          '<div class="profile-content">'+
            '<i class="'+ICONS[p.id]+'" aria-hidden="true"></i>'+
            '<div>'+
              '<span class="profile-content__name">'+p.title+'</span>'+
              '<span class="profile-content__text">'+p.text+'</span>'+
            '</div>'+
          '</div>'+
          '<div class="profile-description">'+p.description+'</div>'+
          connectedIcon;
        
        div.addEventListener('click',(function(d,pref){
          return function(){ 
            var newState = !d.classList.contains('profile--active');
            d.classList.toggle('profile--active'); 
            d.setAttribute('aria-checked', newState ? 'true' : 'false');
            localStorage.setItem(pref.id, newState); 
            self.applyProfileEffect(pref.id, newState);
          };
        })(div,p));
        
        // Keyboard support
        div.addEventListener('keydown', (function(d,pref){
          return function(e){
            if(e.key === 'Enter' || e.key === ' '){
              e.preventDefault();
              var newState = !d.classList.contains('profile--active');
              d.classList.toggle('profile--active');
              d.setAttribute('aria-checked', newState ? 'true' : 'false');
              localStorage.setItem(pref.id, newState);
              self.applyProfileEffect(pref.id, newState);
            }
          };
        })(div,p));
        
        profilesContainer.appendChild(div);
      }
      content.appendChild(profilesContainer);
  
      // ---- ACTIONS ----
      var actionsContainer=document.createElement('div');
      actionsContainer.className='actions-container';
      for(var j=0;j<ACTIONS.length;j++){
        var a=ACTIONS[j];
        var div=document.createElement('div');
        div.className='action-box';
        div.dataset.id=a.id;
        div.tabIndex=0;
        div.innerHTML='<div class="action__content"><i class="'+ICONS[a.id]+'" aria-hidden="true"></i> <span>'+a.title+'</span></div>';
  
        // Range
        if(a.type==='range'){
          var rangeDiv=document.createElement('div');
          rangeDiv.className='range';
          var minus=document.createElement('button'); minus.innerHTML='<i class="fa-solid fa-minus" aria-hidden="true"></i>';
          var plus=document.createElement('button'); plus.innerHTML='<i class="fa-solid fa-plus" aria-hidden="true"></i>';
          var base=document.createElement('div'); base.className='range__base'; base.innerText=a.value+'%';
  
          (function(range,baseEl){
            minus.addEventListener('click',function(){ 
              range.value=Math.max(range.min,range.value-range.step); 
              baseEl.innerText=range.value+'%'; 
              localStorage.setItem(range.id,range.value);
              ACCESSIBILITY.applyActionEffect(range.id,range.value);
            }); 
          })(a,base);
  
          (function(range,baseEl){
            plus.addEventListener('click',function(){ 
              range.value=Math.min(range.max,range.value+range.step); 
              baseEl.innerText=range.value+'%'; 
              localStorage.setItem(range.id,range.value);
              ACCESSIBILITY.applyActionEffect(range.id,range.value);
            }); 
          })(a,base);
  
          rangeDiv.appendChild(minus); rangeDiv.appendChild(base); rangeDiv.appendChild(plus);
          div.appendChild(rangeDiv);
        }
  
        // Color
        if(a.type==='color'){
          var colorDiv=document.createElement('div'); colorDiv.className='color-picker';
          var colors=['#0076B4','#7A549C','#C83733','#D07021','#26999F','#4D7831','#ffffff','#000000'];
          for(var c=0;c<colors.length;c++){
            (function(color,aId){
              var btn=document.createElement('button'); btn.className='color-picker__selection'; btn.style.backgroundColor=color;
              btn.addEventListener('click',function(){ 
                localStorage.setItem(aId,color); 
                document.body.style.setProperty('--'+aId,color); 
                ACCESSIBILITY.applyActionEffect(aId,color);
              });
              colorDiv.appendChild(btn);
            })(colors[c],a.id);
          }
          // Add cancel button
          (function(aId){
            var cancelBtn=document.createElement('button'); 
            cancelBtn.className='color-picker__cancel'; 
            cancelBtn.innerHTML='<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
            cancelBtn.title='Cancel/Reset Color';
            cancelBtn.addEventListener('click',function(){ 
              localStorage.removeItem(aId); 
              document.body.style.removeProperty('--'+aId); 
              if(aId === 'backgroundColor'){
                document.body.classList.remove('has-backgroundColor');
              }
              ACCESSIBILITY.applyActionEffect(aId, null);
            });
            colorDiv.appendChild(cancelBtn);
          })(a.id);
          div.appendChild(colorDiv);
        }
  
        // Toggle
        if(a.type==='toggle'){
          div.addEventListener('click',(function(d,aId){ 
            return function(e){ 
              e.preventDefault();
              e.stopPropagation();
              d.classList.toggle('action-box--active'); 
              localStorage.setItem(aId,d.classList.contains('action-box--active')); 
              ACCESSIBILITY.applyActionEffect(aId,d.classList.contains('action-box--active'));
            }; 
          })(div,a.id));
        }
  
        actionsContainer.appendChild(div);
      }
      content.appendChild(actionsContainer);
    },
  
    // ---------------- CHANGE LANGUAGE ----------------
    changeLanguage:function(langCode, langName, langFlag){
      // Store language preference
      localStorage.setItem('accessibility-language', langCode);
      this.currentLanguage = langCode;
      
      // Set lang attribute on html element
      document.documentElement.setAttribute('lang', langCode);
      
      // Set dir attribute for RTL languages
      var rtlLanguages = ['ar', 'he'];
      if(rtlLanguages.indexOf(langCode) !== -1){
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
      
      // Trigger Google Translate
      this.triggerGoogleTranslate(langCode);
      
      console.log('Language changed to:', langCode, langName, langFlag);
    },
  
    // ---------------- TRIGGER GOOGLE TRANSLATE ----------------
    triggerGoogleTranslate:function(langCode){
      // Prevent multiple simultaneous calls
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
        
        // Look for the Google Translate select element
        var selectElement = document.querySelector('select.goog-te-combo');
        
        if(selectElement){
          clearInterval(checkInterval);
          self.translating = false;
          
          // Don't translate if already in the target language
          if(selectElement.value === langCode){
            console.log('✅ Already in language:', langCode);
            return;
          }
          
          // Set language
          selectElement.value = langCode;
          
          // Trigger change event
          selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          
          console.log('✅ Translated to:', langCode);
        } else if(attempts >= maxAttempts){
          clearInterval(checkInterval);
          self.translating = false;
          console.warn('⚠️ Google Translate not ready yet. Please wait a moment and try again.');
        }
      }, 200);
    },
  
    // ---------------- APPLY EFFECTS ----------------
    applyProfileEffect:function(id,active){
      console.log('📋 Applying profile:', id, 'Active:', active);
      document.body.classList.toggle('profile-'+id, active);
      
      // Special handling for vision impaired profile
      if(id === 'vision'){
        if(active){
          document.documentElement.style.zoom = '1.25';
        } else {
          document.documentElement.style.zoom = '';
        }
      }
      
      // Special handling for ADHD profile
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
      
      // Special handling for Keyboard Navigation profile (motor)
      if(id === 'motor'){
        console.log('⌨️ Keyboard Navigation profile triggered! Active:', active);
        if(active){
          this.setupKeyboardNavigation();
          this.keyboardNavActive = true;
          
          // AUTO-ACTIVATE Screen Reader profile (blind)
          document.body.classList.add('profile-blind');
          var blindProfileEl = this.widget.querySelector('.profile[data-id="blind"]');
          if(blindProfileEl && !blindProfileEl.classList.contains('profile--active')){
            blindProfileEl.classList.add('profile--active');
            blindProfileEl.setAttribute('aria-checked', 'true');
            localStorage.setItem('blind', 'true');
            console.log('🔗 Auto-activated Screen Reader profile');
            
            // Setup screen reader with audio
            this.setupScreenReader();
            
            // Enhance screen reader compatibility
            this.enhanceScreenReaderCompatibility();
          }
        } else {
          this.removeKeyboardNavigation();
          this.keyboardNavActive = false;
          
          // AUTO-DEACTIVATE Screen Reader profile (blind)
          document.body.classList.remove('profile-blind');
          var blindProfileEl = this.widget.querySelector('.profile[data-id="blind"]');
          if(blindProfileEl && blindProfileEl.classList.contains('profile--active')){
            blindProfileEl.classList.remove('profile--active');
            blindProfileEl.setAttribute('aria-checked', 'false');
            localStorage.setItem('blind', 'false');
            console.log('🔗 Auto-deactivated Screen Reader profile');
            
            // Remove screen reader audio
            this.removeScreenReader();
            
            // Remove screen reader enhancements
            this.removeScreenReaderEnhancements();
          }
        }
      }
      
      // Special handling for Screen Reader profile (blind)
      if(id === 'blind'){
        console.log('👁️ Screen Reader profile triggered! Active:', active);
        if(active){
          // Setup screen reader with audio
          this.setupScreenReader();
          
          // Enhance screen reader compatibility
          this.enhanceScreenReaderCompatibility();
          
          // AUTO-ACTIVATE Keyboard Navigation profile (motor)
          document.body.classList.add('profile-motor');
          var motorProfileEl = this.widget.querySelector('.profile[data-id="motor"]');
          if(motorProfileEl && !motorProfileEl.classList.contains('profile--active')){
            motorProfileEl.classList.add('profile--active');
            motorProfileEl.setAttribute('aria-checked', 'true');
            localStorage.setItem('motor', 'true');
            console.log('🔗 Auto-activated Keyboard Navigation profile');
            
            // Setup keyboard navigation if not already active
            if(!this.keyboardNavActive){
              this.setupKeyboardNavigation();
              this.keyboardNavActive = true;
            }
          }
        } else {
          // Remove screen reader audio
          this.removeScreenReader();
          
          // Remove screen reader enhancements
          this.removeScreenReaderEnhancements();
          
          // AUTO-DEACTIVATE Keyboard Navigation profile (motor)
          document.body.classList.remove('profile-motor');
          var motorProfileEl = this.widget.querySelector('.profile[data-id="motor"]');
          if(motorProfileEl && motorProfileEl.classList.contains('profile--active')){
            motorProfileEl.classList.remove('profile--active');
            motorProfileEl.setAttribute('aria-checked', 'false');
            localStorage.setItem('motor', 'false');
            console.log('🔗 Auto-deactivated Keyboard Navigation profile');
            
            // Remove keyboard navigation if active
            if(this.keyboardNavActive){
              this.removeKeyboardNavigation();
              this.keyboardNavActive = false;
            }
          }
        }
      }
    },
  
    applyActionEffect:function(id,value){
      // Get all elements except the widget
      var pageContent = document.querySelectorAll('body > *:not(#accessibilityWidget):not(#accessibilityTrigger)');
      
      switch(id){
        case 'zoom': 
          // Content scaling: 0% = default, 100% = 200%
          if(parseFloat(value) === 0) {
            document.documentElement.style.fontSize = '';
          } else {
            var zoomScale = 100 + parseFloat(value);
            document.documentElement.style.fontSize = zoomScale + '%';
          }
          break;
          
        case 'fontSize': 
          // Font size: 0% = default, 100% = 200%
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
          // Line height: 0% = default, 100% = double the original for EACH element
          if(parseFloat(value) === 0) {
            pageContent.forEach(function(el){
              el.style.lineHeight = '';
            });
          } else {
            pageContent.forEach(function(el){
              // Get THIS element's computed line-height
              var computedStyle = window.getComputedStyle(el);
              var currentLineHeight = parseFloat(computedStyle.lineHeight);
              
              // If line-height is in pixels, convert to unitless value
              if(!isNaN(currentLineHeight)){
                var fontSize = parseFloat(computedStyle.fontSize);
                var lineHeightRatio = currentLineHeight / fontSize;
                
                // Scale from original ratio to double: ratio * (1 + value/100)
                var newLineHeight = lineHeightRatio * (1 + (parseFloat(value) / 100));
                el.style.lineHeight = newLineHeight;
              }
            });
          }
          break;
          
        case 'letterSpacing': 
          // Letter spacing: 0% = default, 100% = 0.1em
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
          // Set CSS variable for title color
          if(value){
            document.body.style.setProperty('--titleColor', value);
          } else {
            document.body.style.removeProperty('--titleColor');
          }
          break;
          
        case 'textColor':
          // Set CSS variable for text color
          if(value){
            document.body.style.setProperty('--textColor', value);
            document.body.classList.add('has-textColor');
          } else {
            document.body.style.removeProperty('--textColor');
            document.body.classList.remove('has-textColor');
          }
          break;
          
        case 'backgroundColor':
          // Set CSS variable and class for background color
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
  
    // ---------------- RESTORE ----------------
    restorePreferences:function(){
      // Profiles
      for(var i=0;i<PROFILES.length;i++){
        var p=PROFILES[i];
        var active=localStorage.getItem(p.id)==='true';
        var el=this.widget.querySelector('.profile[data-id="'+p.id+'"]');
        if(el && active){
          el.classList.add('profile--active');
          this.applyProfileEffect(p.id,true);
        }
      }
      
      // Actions
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
  
    // ---------------- RESTORE LANGUAGE ----------------
    restoreLanguage:function(){
      var savedLang = localStorage.getItem('accessibility-language');
      if(savedLang && LANGUAGES[savedLang]){
        this.currentLanguage = savedLang;
        document.documentElement.setAttribute('lang', savedLang);
        
        // Set dir attribute for RTL languages
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
        
        // Only trigger translation if not English (default)
        if(savedLang !== 'en'){
          // Delay to ensure Google Translate is fully loaded
          var self = this;
          setTimeout(function(){
            self.triggerGoogleTranslate(savedLang);
          }, 2000);
        }
      }
    },
  
    // ---------------- RESET ALL SETTINGS ----------------
    resetAllSettings:function(){
      var self = this;
      
      // Clear all localStorage items
      localStorage.clear();
      
      // Reset language to English
      this.currentLanguage = 'en';
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      
      // Update language dropdown UI
      var currentLanguageSpan = this.widget.querySelector('.current-language');
      var currentFlagSpan = this.widget.querySelector('.current-flag');
      if(currentLanguageSpan){
        currentLanguageSpan.textContent = 'English (US)';
      }
      if(currentFlagSpan){
        currentFlagSpan.textContent = '🇺🇸';
      }
      
      // Reset to English with Google Translate
      this.triggerGoogleTranslate('en');
      
      // Remove all profile classes
      for(var i = 0; i < PROFILES.length; i++){
        var p = PROFILES[i];
        document.body.classList.remove('profile-' + p.id);
        var profileEl = this.widget.querySelector('.profile[data-id="' + p.id + '"]');
        if(profileEl){
          profileEl.classList.remove('profile--active');
        }
      }
      
      // Reset vision profile zoom
      document.documentElement.style.zoom = '';
      
      // Remove all action classes and reset styles
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
      
      // Remove magnifier listeners if active
      if(this.magnifierActive){
        this.removeMagnifierListeners();
        this.magnifierActive = false;
      }
      
      // Remove reading guide listeners if active
      if(this.readingGuideActive){
        this.removeReadingGuideListeners();
        this.readingGuideActive = false;
      }
      
      // Remove ADHD focus listeners if active
      if(this.adhdFocusActive){
        this.removeAdhdFocusListeners();
        this.adhdFocusActive = false;
      }
      
      // Remove keyboard navigation if active
      if(this.keyboardNavActive){
        this.removeKeyboardNavigation();
        this.keyboardNavActive = false;
      }
      
      // Remove screen reader if active
      if(this.screenReaderActive){
        this.removeScreenReader();
        this.screenReaderActive = false;
      }
      
      // Remove focus tracking if active
      if(this.focusTrackingActive){
        this.removeFocusTracking();
        this.focusTrackingActive = false;
      }
      
      // Reset all action boxes UI
      var actionBoxes = this.widget.querySelectorAll('.action-box');
      for(var k = 0; k < actionBoxes.length; k++){
        actionBoxes[k].classList.remove('action-box--active');
      }
      
      // Reset all range values
      var rangeBases = this.widget.querySelectorAll('.range__base');
      for(var l = 0; l < rangeBases.length; l++){
        rangeBases[l].textContent = '0%';
      }
      
      // Reset ACTIONS array values
      for(var m = 0; m < ACTIONS.length; m++){
        if(ACTIONS[m].type === 'range'){
          ACTIONS[m].value = 0;
        }
      }
      
      // Reset inline styles
      document.documentElement.style.fontSize = '';
      document.body.style.removeProperty('--titleColor');
      document.body.style.removeProperty('--textColor');
      document.body.style.removeProperty('--backgroundColor');
      
      // Reset all page content styles
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