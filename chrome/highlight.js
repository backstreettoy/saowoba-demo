
/*
 * This is the function that actually highlights a text string by
 * adding HTML tags before and after all occurrences of the search
 * term. You can pass your own tags if you'd like, or if the
 * highlightStartTag or highlightEndTag parameters are omitted or
 * are empty strings then the default <font> tags will be used.
 */
    function doHighlight(elements, searchTerm, highlightStartTag, highlightEndTag) 
    {
    // the highlightStartTag and highlightEndTag parameters are optional
      if ((!highlightStartTag) || (!highlightEndTag)) {
        highlightStartTag = "<span style='color:blue; background-color:yellow;'>";
        highlightEndTag = "</span>";
      }
      if(!searchTerm.pattern) {
        return ;
      }

      var preConditionPattern = new RegExp(searchTerm.pattern[0],'img');
      var pattern = new RegExp('(' + searchTerm.pattern[1] + ')','img');
      $(elements).each(function(index,elem){
        if(typeof($(elem).html) == 'undefined' || $(elem).children().length > 0) {
          return ;
        }
        var bodyText = $(elem).html();

        if(preConditionPattern.test(bodyText)) {
          var newText = bodyText.replace(pattern, highlightStartTag + '$1' + highlightEndTag);

          if(bodyText.trim().length != newText.trim().length) {
            $(elem).html(newText);
          }
        }
      });

    }


/*
 * This is sort of a wrapper function to the doHighlight function.
 * It takes the searchText that you pass, optionally splits it into
 * separate words, and transforms the text on the current web page.
 * Only the "searchText" parameter is required; all other parameters
 * are optional and can be omitted.
 */
function highlightSearchTerms(searchArray,warnOnFailure, highlightStartTag, highlightEndTag)
{
  // if the treatAsPhrase parameter is true, then we should search for 
  // the entire phrase that was entered; otherwise, we will split the
  // search string so that each word is searched for and highlighted
  // individually
  
  if (!document.body || typeof(document.body.innerHTML) == "undefined") {
    if (warnOnFailure) {
      alert("Sorry, for some reason the text of this page is unavailable. Searching will not work.");
    }
    return false;
  }
  
  var bodyElement = $('p,a,li,b,i,strong,u,span,font,div,address')
  for (var i = 0; i < searchArray.length; i++) {
    bodyText = doHighlight(bodyElement, searchArray[i], highlightStartTag, highlightEndTag);
  }
  return true;
}


