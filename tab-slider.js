// Custom Autoplay Tab
jQuery(document).ready(function($) {
    if (!$('body').hasClass('elementor-editor-active')) {

        // Set the interval for autoplay (5000 milliseconds = 5 seconds)
        var interval = 5000;

        // Function to switch tabs
        function switchTab($tabContainer) {
            // Get the current active tab
            var currentTab = $tabContainer.find('.e-n-tab-title[aria-selected="true"]');

            // Get the next tab or the first tab if there is no next tab
            var nextTab = currentTab.next('.e-n-tab-title').length ? currentTab.next('.e-n-tab-title') : $tabContainer.find('.e-n-tab-title:first');

            // Remove the active class from the current tab and content
            currentTab.attr('aria-selected', 'false');
            $tabContainer.find('.e-n-tabs-content > .elementor-element.e-active').removeClass('e-active');

            // Add the active class to the next tab and content
            nextTab.attr('aria-selected', 'true');
            $tabContainer.find('.e-n-tabs-content > .elementor-element').eq(nextTab.index()).addClass('e-active');
        }

        if (window.innerWidth > 767) {
            // Set an interval to switch tabs for each set of tabs
            $('.autoplay-tab').each(function() {
                var $tabContainer = $(this);
                var autoplayInterval = setInterval(function() {
                    switchTab($tabContainer);
                }, interval);


                // Pause autoplay on tab click for each set of tabs
                $tabContainer.find('.e-n-tab-title').on('click', function() {
                    clearInterval(autoplayInterval);

                    // Remove "clicked-tab" class from all elements with the class ".autoplay-tab .e-n-tab-title"
                    $tabContainer.find(".e-n-tab-title").removeClass("clicked-tab");

                    // Add "clicked-tab" class only to the clicked element
                    $(this).addClass("clicked-tab");
                });

                // Prevent default behavior of links within .e-n-tab-title without stopping event propagation
                $tabContainer.find('.e-n-tab-title a').on('click', function(event) {
                    event.stopPropagation(); // Stop event propagation to prevent triggering parent onclick action
                });

                // Call the function to add the progress bar for each set of tabs
                addProgressBar($tabContainer);
            });
        } else {
            // Set an interval to switch tabs for each set of tabs
            $('.autoplay-tab.mobile-autoplay').each(function() {
                var $tabContainer = $(this);
                var autoplayInterval = setInterval(function() {
                    switchTab($tabContainer);
                }, interval);


                // Pause autoplay on tab click for each set of tabs
                $tabContainer.find('.e-n-tab-title').on('click', function() {
                    clearInterval(autoplayInterval);

                    // Remove "clicked-tab" class from all elements with the class ".autoplay-tab .e-n-tab-title"
                    $tabContainer.find(".e-n-tab-title").removeClass("clicked-tab");

                    // Add "clicked-tab" class only to the clicked element
                    $(this).addClass("clicked-tab");
                });

                // Prevent default behavior of links within .e-n-tab-title without stopping event propagation
                $tabContainer.find('.e-n-tab-title a').on('click', function(event) {
                    event.stopPropagation(); // Stop event propagation to prevent triggering parent onclick action
                });

                // Call the function to add the progress bar for each set of tabs
                addProgressBar($tabContainer);
            });
        }

        function addProgressBar($tabContainer) {
            // HTML for the progress bar container and bar
            var progressBarHTML = '<div class="progress-bar-container">' +
                '<div class="progress-bar"></div>' +
                '</div>';

            // Append the progress bar HTML to each .e-n-tab-title in the specified container
            $tabContainer.find('.e-n-tab-title').prepend(progressBarHTML);
        }

    }
});
