(ns taboo.view
  (:require
   ["./react-tinder-card" :refer [TinderCard]]
   ["@material-ui/core/Button" :default Button]
   ["@material-ui/core/Card" :default Card]
   ["@material-ui/core/CardContent" :default CardContent]
   ["@material-ui/core/CardHeader" :default CardHeader]
   ["@material-ui/core/IconButton" :default IconButton]
   ["@material-ui/core/styles/makeStyles" :default makeStyles]
   ["@material-ui/icons/Add" :default AddIcon]
   ["@material-ui/icons/Check" :default CheckIcon]
   ["@material-ui/icons/Clear" :default ClearIcon]
   ["@material-ui/icons/FastForward" :default FastForwardIcon]
   ["@material-ui/icons/FastRewind" :default FastRewindIcon]
   ["@material-ui/icons/Redo" :default RedoIcon]
   ["@material-ui/icons/Remove" :default RemoveIcon]
   ["react" :as react]
   [cljs-bean.core :refer [->clj]]
   [clojure.string :as str]
   [crinkle.component :refer [CE RE]]
   [crinkle.dom :as d]
   [goog.string :as gstr]
   [goog.string.format]
   [taboo.words :as w])
)

;; TODO !!! reset timer button
;; FIXME hide score keeping during gameplay. it doesn't show in the beginning but that actually works out for the best.
;; TODO score keeping should not use absolute position class
;; TODO can I do a floating, arrow down to show to scroll on the review panel?
;; TODO rotate cards to it looks like a stack
;; TODO after rotating cards, visually prepare next card when swiping top card so it is vertical and easy to read

;; Card visual reference https://www.bestchoicereviews.org/wp-content/uploads/2014/12/taboo-card-and-board-games.jpg

(def dev-words
  [["A" "a" "a" "a" "a"]
   ["B" "b" "b" "b" "b"]
   ["C" "c" "c" "c" "c"]
   ["D" "d" "d" "d" "d"]
   ["E" "e" "e" "e" "e"]])

(def styles
  (makeStyles (fn [theme]
                (let [theme              (->clj theme)
                      card-width         260
                      card-height        (* 1.5 card-width)
                      next-button-height 60
                      next-button-margin ((:spacing theme) 1.0)]
                  #js {:app          #js {:fontFamily    "'Walter Turncoat', 'Roboto', sans-serif" ;; , cursive (phone was making cursive weird but may have been bad import)
                                          ;; :dispaly       "flex"
                                          ;; :flexDirection "column"
                                          }
                       ;; :game         #js {:flex-grow 10}
                       :scores         #js {:position        "absolute"
                                            :bottom          4
                                            :textAlign       "center"
                                            :width           "100%"}
                       :score        #js {:margin  ((:spacing theme) 1.0)
                                          :padding ((:spacing theme) 1.0)}
                       :score-span   #js {:margin ((:spacing theme) 0.5)
                                          :fontWeight "bolder"}
                       :deck         #js {:marginTop ((:spacing theme) 4.0)
                                          :width     card-width
                                          :height    card-height}
                       :tinder-card  #js {:position "absolute"
                                          :top      0
                                          :bottom   0
                                          :left     0
                                          :right    0}
                       :card         #js {:textAlign   "center"
                                          :marginLeft  "auto"
                                          :marginRight "auto"
                                          :marginTop   ((:spacing theme) 4.0)
                                          :width       card-width
                                          :height      card-height}
                       :card-header  #js {:color   "white"
                                          :height  (* 0.1 card-height)
                                          :padding ((:spacing theme) 2.0)}
                       :card-content #js {:backgroundColor "seashell"
                                          :padding         ((:spacing theme) 2.0)
                                          :marginLeft      ((:spacing theme) 1.0)
                                          :marginRight     ((:spacing theme) 1.0)
                                          :marginBottom    ((:spacing theme) 1.0)
                                          :height          (- card-height
                                                              ;; minus header and header padding
                                                              (* 0.1 card-height)
                                                              (* 2 ((:spacing theme) 2.0))
                                                              ;; minus content padding
                                                              (* 2 ((:spacing theme) 2.0))
                                                              ;; minus content margin
                                                              ((:spacing theme) 1.0)
                                                              ;; Actual border
                                                              ((:spacing theme) 1.0))
                                          :display         "flex"
                                          :flexDirection   "column"
                                          :justifyContent  "space-evenly"}

                       :taboo          #js {:marginTop    ((:spacing theme) 1.5)
                                            :marginBottom ((:spacing theme) 1.5)}
                       :purple         #js {:backgroundColor "#8e2dfc"}
                       :green          #js {:backgroundColor "#27c4a8"}
                       :blue           #js {:backgroundColor "dodgerblue"}
                       :pale-purple    #js {:backgroundColor "#e4cffc"}
                       :pale-green     #js {:backgroundColor "#d2fcf5"}
                       :front          #js {:zIndex -1}
                       :clock          #js {:fontFamily "'Roboto Mono', monospace"
                                            :textAlign  "center"
                                            :margin     ((:spacing theme) 4.0)}
                       :clock-span     #js {:fontSize 24} ;; TODO look into using (:typography theme)
                       :invisible      #js {:visibility "hidden"}
                       :display-none   #js {:display "none"}
                       :next-button    #js {:height (str next-button-height "px")
                                            :margin next-button-margin}
                       :history-button #js {:height (str (+ (* next-button-height 3) (* next-button-margin 4)) "px")
                                            :margin ((:spacing theme) 1.0)}
                       :review         #js {:background    "linear-gradient(0deg, #e3ffe7 0%, #d9e7ff 100%)"
                                            :position      "absolute"
                                            :top           0
                                            :right         0
                                            :left          0
                                            :display       "flex"
                                            :flexDirection "column"
                                            :padding       ((:spacing theme) 2.0)}
                       :review-item    #js {:fontFamily "'Roboto', sans-serif"
                                            :margin     ((:spacing theme) 2.0)}
                       :review-target  #js {:fontSize   "larger"
                                            :fontWeight "bold"}
                       :review-taboo   #js {:margin ((:spacing theme) 2.0)}
                       :review-button  #js {:margin ((:spacing theme) 2.0)}}))))

(defn classname
  [classes classnames]
  (let [classnames (if (vector? classnames)
                     classnames
                     (vector classnames))]
    (str/join " " (into []
                        (map #(get classes %))
                        classnames))))

(defn review
  [{:keys [classes wordsets setReviewing]}]
  (d/div {:className (:review classes)}
         (into []
               (comp
                 (map (fn [[target & taboo]]
                        (d/div {:className (:review-item classes)
                                :key       target}
                               (d/div {:className (:review-target classes)} target)
                               (into []
                                     (map #(d/div {:className (:review-taboo classes)
                                                   :key       (str target "/" %)}
                                                  %))
                                     taboo)))))
               wordsets)
         (RE Button {:className (:review-button classes)
                     :variant   "contained"
                     :color     "primary"
                     :onClick   (fn [_e]
                                  (setReviewing false))}
             "Continue")))

(defn card
  [{:keys [classes target taboo]}]
  (RE Card {:className (classname classes [:card (if (= target "Ready?")
                                                   :blue
                                                   (if (even? (count target))
                                                     :purple
                                                     :green))])}
      (RE CardHeader {:className             (:card-header classes)
                      :title                 (str/upper-case target)
                      ;; If I want to use same font as other text.
                      ;; Alternatively, and better, is to pass in titleTypographyProps
                      #_#_:disableTypography true})
      (RE CardContent {:className (:card-content classes)}
          (into []
                (map #(d/div {:key       %
                              :className (:taboo classes)}
                             (str/upper-case %)))
                taboo))))

(defn start-card
  [{:keys [classes]}]
  (RE Card {:className (classname classes [:blue])}))

(defn swipe-card
  [{:keys [classname child-card on-card-left-screen]}]
  (RE TinderCard {:className        classname
                  :preventSwipe     #js ["up" "down"]
                  :onSwipe          identity ;; function required
                  :onCardLeftScreen on-card-left-screen}
      child-card))

(defn deck
  [{:keys [classes extra-classes wordsets setT]}]
  (d/div {:className (str (:deck classes) " " extra-classes)}
         (into []
               (map (fn [[target & taboo]]
                      (CE swipe-card {:classname           (classname classes [:tinder-card])
                                      :on-card-left-screen (fn []
                                                             (setT inc))
                                      :child-card          (CE card {:classes classes
                                                                     :target  target
                                                                     :taboo   taboo})}
                          :key target)))
               wordsets)))

(defn clock
  [{:keys [classes extra-classes timer]}]
  (let [minutes (int (/ timer 60))
        seconds (mod timer 60)]
    (d/div {:className (str (:clock classes) " " extra-classes)}
           (d/span {:className (:clock-span classes)}
                   (str minutes ":" (gstr/format "%02d" seconds))))))

(defn score
  [{:keys [classes color]}]
  (let [[score setScore] (react/useState 0)]
    (d/span {:className (classname classes [:score color])}
            (RE IconButton {:onClick #(setScore dec)}
                (RE RemoveIcon nil))
            (d/span {:className (:score-span classes)} score)
            (RE IconButton {:onClick #(setScore inc)}
                (RE AddIcon nil)))))

(defn scores
  [{:keys [classes reviewing?]}]
  (when-not reviewing?
    (d/div {:className (:scores classes)}
           (CE score {:classes classes
                      :color   :pale-purple})
           (CE score {:classes classes
                      :color   :pale-green}))))

(defn game
  [{:keys [classes]}]
  (let [game-seconds              (as-> (-> (js/URLSearchParams. js/window.location.search) (.get "t") js/parseInt)
                                      custom-game-length
                                    (if (js/isNaN custom-game-length)
                                      61
                                      custom-game-length))
        excess                    5
        [t setT]                  (react/useState 0)
        [wordsets setWordsets]    (react/useState (reverse (take excess w/words)))
        [timer setTimer]          (react/useState 0)
        [turn setTurn]            (react/useState [0 0])
        [reviewing? setReviewing] (react/useState false)]
    ;; (prn (into [] (map first) wordsets))
    ;; (prn "t:" t)
    ;; (prn "timer:" timer)
    ;; (prn "turn:" turn)

    ;; t triggers wordsets update
    (react/useEffect (fn []
                       (setWordsets (reverse (subvec w/words t (+ t excess))))
                       (constantly nil))
                     #js[t])

    ;; skip leftover card when round is over
    (react/useEffect (fn []
                       (when (zero? timer)
                         (setWordsets drop-last)
                         (setT inc)
                         (setTurn (fn [[start end]]
                                    [end t]))
                         (setReviewing true))
                       (constantly nil))
                     #js[timer])

    ;; countdown timer
    (react/useEffect (fn []
                       (let [interval (js/setInterval
                                        (fn []
                                          (setTimer (fn [x]
                                                      (if (> x 0)
                                                        (dec x)
                                                        0))))
                                        1000)]
                         (fn []
                           (js/clearInterval interval))))
                     #js[])

    (d/div {:className (:game classes)}
           ;; Using a when outside of swipe-card causes it to entirely re-render since the
           ;; old one would be off screen if it still existed. If I rewrite the js swiping lib
           ;; I can fix that.
           (when (zero? timer)
             (CE swipe-card {:classname           (classname classes [:tinder-card :front])
                             :on-card-left-screen (fn []
                                                    (setTimer game-seconds))
                             :child-card          (CE card {:classes classes
                                                            :target  "Ready?"
                                                            :taboo   ["Swipe to begin"]})}))
           (when (and (zero? timer) reviewing? (pos? (second turn)))
             (CE review {:classes      classes
                         :wordsets     (subvec w/words (inc (first turn)) (inc (second turn)))
                         :setReviewing setReviewing}))
           (CE deck {:classes       classes
                     :extra-classes (when (zero? timer) (:display-none classes))
                     :wordsets      wordsets
                     :setT          setT})
           (CE clock {:classes       classes
                      :extra-classes (when (zero? timer) (:invisible classes))
                      :timer         timer})
           (CE scores {:classes    classes
                       :reviewing? reviewing?}))))

(defn app
  []
  (let [classes (->clj (styles))]
    (d/div {:className (:app classes)}
           (CE game {:classes classes}))))
