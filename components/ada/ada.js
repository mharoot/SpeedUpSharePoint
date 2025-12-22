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
    blind:'fa-solid fa-universal-access',
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
    {id:'seizures', title:'Seizure Safe', text:'Clear flashes & colors', description:'Eliminates flashing content', active:true},
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
  
    init:function(){
      // Store original computed line-height
      this.originalLineHeight = window.getComputedStyle(document.body).lineHeight;
      
      this.createTrigger();
      this.createWidget();
      this.restorePreferences();
      this.restoreLanguage();
      
      // Initialize Google Translate AFTER widget is created
      this.initializeGoogleTranslate();
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
      trigger.innerHTML='<i class="fa-solid fa-universal-access fa-lg"></i>';
      document.body.appendChild(trigger);
      var self=this;
      trigger.addEventListener('click', function(){ 
        self.widget.classList.toggle('accessibilityOpen'); 
      });
    },
  
    createWidget:function(){
      var self=this;
      this.widget = document.createElement('div');
      this.widget.id='accessibilityWidget';
      this.widget.className='accessibility-no-scale';
      this.widget.style.maxWidth='550px';
      this.widget.style.width='95%';
      this.widget.innerHTML=
        '<div class="accessibilityClose"><i class="fa-solid fa-xmark"></i></div>'+
        '<div class="accessibilityHeader">'+
          '<div class="language-dropdown">'+
            '<button class="language-dropdown__button"><span class="current-flag">🇺🇸</span> <span class="current-language">English (US)</span> <i class="fa-solid fa-chevron-down"></i></button>'+
            '<div class="language-dropdown__menu"></div>'+
          '</div>'+
          '<span class="accessibilityHeader__title">Accessibility</span>'+
        '</div>'+
        '<div class="accessibilityContent"></div>';
      document.body.appendChild(this.widget);
  
      // Close button
      this.widget.querySelector('.accessibilityClose').addEventListener('click', function(){ 
        self.widget.classList.remove('accessibilityOpen'); 
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
        div.innerHTML=
          '<div class="profile-content">'+
            '<i class="'+ICONS[p.id]+'"></i>'+
            '<div>'+
              '<span class="profile-content__name">'+p.title+'</span>'+
              '<span class="profile-content__text">'+p.text+'</span>'+
            '</div>'+
          '</div>'+
          '<div class="profile-description">'+p.description+'</div>';
        div.addEventListener('click',(function(d,pref){
          return function(){ 
            d.classList.toggle('profile--active'); 
            localStorage.setItem(pref.id, d.classList.contains('profile--active')); 
            self.applyProfileEffect(pref.id,d.classList.contains('profile--active'));
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
        div.innerHTML='<div class="action__content"><i class="'+ICONS[a.id]+'"></i> <span>'+a.title+'</span></div>';
  
        // Range
        if(a.type==='range'){
          var rangeDiv=document.createElement('div');
          rangeDiv.className='range';
          var minus=document.createElement('button'); minus.innerHTML='<i class="fa-solid fa-minus"></i>';
          var plus=document.createElement('button'); plus.innerHTML='<i class="fa-solid fa-plus"></i>';
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
          div.appendChild(colorDiv);
        }
  
        // Toggle
        if(a.type==='toggle'){
          div.addEventListener('click',(function(d,aId){ 
            return function(){ 
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
      var attempts = 0;
      var maxAttempts = 30;
      
      var checkInterval = setInterval(function(){
        attempts++;
        
        // Look for the Google Translate select element
        var selectElement = document.querySelector('select.goog-te-combo');
        
        if(selectElement){
          clearInterval(checkInterval);
          
          // Set language
          selectElement.value = langCode;
          
          // Trigger change event
          selectElement.dispatchEvent(new Event('change', { bubbles: true }));
          
          // Force trigger if first didn't work
          if(selectElement.onchange) {
            selectElement.onchange();
          }
          
          console.log('✅ Translated to:', langCode);
        } else if(attempts >= maxAttempts){
          clearInterval(checkInterval);
          console.warn('⚠️ Google Translate not ready yet. Please wait a moment and try again.');
        }
      }, 200);
    },
  
    // ---------------- APPLY EFFECTS ----------------
    applyProfileEffect:function(id,active){
      document.body.classList.toggle('profile-'+id, active);
      
      // Special handling for vision impaired profile
      if(id === 'vision'){
        if(active){
          document.documentElement.style.zoom = '1.25';
        } else {
          document.documentElement.style.zoom = '';
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
          // Line height: 0% = default, 100% = double the original
          if(parseFloat(value) === 0) {
            pageContent.forEach(function(el){
              el.style.lineHeight = '';
            });
          } else {
            var originalLH = parseFloat(this.originalLineHeight) || 1.5;
            var lineHeight = originalLH * (1 + (parseFloat(value) / 100));
            pageContent.forEach(function(el){
              el.style.lineHeight = lineHeight + 'px';
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
          document.body.classList.toggle('magnifier', !!value);
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
        
        // Trigger translation
        this.triggerGoogleTranslate(savedLang);
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded',function(){ ACCESSIBILITY.init(); });
  })();