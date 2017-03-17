(function(b) {
	b.fn.ronbongpage = function(c) {
		function pa(a) {
			a.find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>');
			"#fff" != c.controlArrowColor && (a.find(".fp-controlArrow.fp-next").css("border-color", "transparent transparent transparent " + c.controlArrowColor), a.find(".fp-controlArrow.fp-prev").css("border-color", "transparent " + c.controlArrowColor + " transparent transparent"));
			c.loopHorizontal || a.find(".fp-controlArrow.fp-prev").hide()
		}
		function qa() {
			b("body").append('<div id="fp-nav"><ul></ul></div>');
			k = b("#fp-nav");
			k.css("color", c.navigationColor);
			k.addClass(c.navigationPosition);
			for (var a = 0; a < b(".fp-section").length; a++) {
				var d = "";
				c.anchors.length && (d = c.anchors[a]);
				var d = '<li><a href="#' + d + '"><span></span></a>',
				e = c.navigationTooltips[a];
				void 0 != e && "" != e && (d += '<div class="fp-tooltip ' + c.navigationPosition + '">' + e + "</div>");
				d += "</li>";
				k.find("ul").append(d)
			}
		}
		function R() {
			b(".fp-section").each(function() {
				var a = b(this).find(".fp-slide");
				a.length ? a.each(function() {
					y(b(this))
				}) : y(b(this))
			});
			b.isFunction(c.afterRender) && c.afterRender.call(this)
		}
		function S() {
			if (!c.autoScrolling || c.scrollBar) {
				var a = b(window).scrollTop(),
				d = 0,
				e = Math.abs(a - b(".fp-section").first().offset().top);
				b(".fp-section").each(function(c) {
					var f = Math.abs(a - b(this).offset().top);
					f < e && (d = c, e = f)
				});
				var f = b(".fp-section").eq(d)
			}
			if (!c.autoScrolling && !f.hasClass("active")) {
				F = !0;
				var ra = b(".fp-section.active").index(".fp-section") + 1,
				g = G(f),
				h = f.data("anchor"),
				k = f.index(".fp-section") + 1,
				l = f.find(".fp-slide.active");
				if (l.length) var n = l.data("anchor"),
				t = l.index();
				f.addClass("active").siblings().removeClass("active");
				m || (b.isFunction(c.onLeave) && c.onLeave.call(this, ra, k, g), b.isFunction(c.afterLoad) && c.afterLoad.call(this, h, k));
				H(h, 0);
				c.anchors.length && !m && (p = h, I(t, n, h, k));
				clearTimeout(T);
				T = setTimeout(function() {
					F = !1
				},
				100)
			}
			c.scrollBar && (clearTimeout(U), U = setTimeout(function() {
				m || q(f)
			},
			1E3))
		}
		function V(a) {
			return scrollable = a.find(".fp-slides").length ? a.find(".fp-slide.active").find(".fp-scrollable") : a.find(".fp-scrollable")
		}
		function z(a, d) {
			if (l[a]) {
				if ("down" == a) var c = "bottom",
				f = b.fn.ronbongpage.moveSectionDown;
				else c = "top",
				f = b.fn.ronbongpage.moveSectionUp;
				if (0 < d.length) if (c = "top" === c ? !d.scrollTop() : "bottom" === c ? d.scrollTop() + 1 + d.innerHeight() >= d[0].scrollHeight: void 0, c) f();
				else return ! 0;
				else f()
			}
		}
		function sa(a) {
			var d = a.originalEvent;
			if (!W(a.target)) {
				c.autoScrolling && !c.scrollBar && a.preventDefault();
				a = b(".fp-section.active");
				var e = V(a);
				m || t || (d = X(d), u = d.y, A = d.x, a.find(".fp-slides").length && Math.abs(B - A) > Math.abs(v - u) ? Math.abs(B - A) > b(window).width() / 100 * c.touchSensitivity && (B > A ? l.right && b.fn.ronbongpage.moveSlideRight() : l.left && b.fn.ronbongpage.moveSlideLeft()) : c.autoScrolling && !c.scrollBar && Math.abs(v - u) > b(window).height() / 100 * c.touchSensitivity && (v > u ? z("down", e) : u > v && z("up", e)))
			}
		}
		function W(a, d) {
			d = d || 0;
			var e = b(a).parent();
			return d < c.normalScrollElementTouchThreshold && e.is(c.normalScrollElements) ? !0 : d == c.normalScrollElementTouchThreshold ? !1 : W(e, ++d)
		}
		function ta(a) {
			a = X(a.originalEvent);
			v = a.y;
			B = a.x
		}
		function r(a) {
			if (c.autoScrolling) {
				a = window.event || a;
				var d = Math.max( - 1, Math.min(1, a.wheelDelta || -a.deltaY || -a.detail));
				c.scrollBar && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
				a = b(".fp-section.active");
				a = V(a);
				m || (0 > d ? z("down", a) : z("up", a));
				return ! 1
			}
		}
		function Y(a) {
			var d = b(".fp-section.active").find(".fp-slides");
			if (d.length && !t) {
				var e = d.find(".fp-slide.active"),
				f = null,
				f = "prev" === a ? e.prev(".fp-slide") : e.next(".fp-slide");
				if (!f.length) {
					if (!c.loopHorizontal) return;
					f = "prev" === a ? e.siblings(":last") : e.siblings(":first")
				}
				t = !0;
				w(d, f)
			}
		}
		function Z() {
			b(".fp-slide.active").each(function() {
				J(b(this))
			})
		}
		function q(a, d, e) {
			var f = a.position();
			if ("undefined" !== typeof f && (d = {
				element: a,
				callback: d,
				isMovementUp: e,
				dest: f,
				dtop: f.top,
				yMovement: G(a),
				anchorLink: a.data("anchor"),
				sectionIndex: a.index(".fp-section"),
				activeSlide: a.find(".fp-slide.active"),
				activeSection: b(".fp-section.active"),
				leavingSection: b(".fp-section.active").index(".fp-section") + 1,
				localIsResizing: x
			},
			!(d.activeSection.is(a) && !x || c.scrollBar && b(window).scrollTop() === d.dtop))) {
				if (d.activeSlide.length) var g = d.activeSlide.data("anchor"),
				h = d.activeSlide.index();
				c.autoScrolling && c.continuousVertical && "undefined" !== typeof d.isMovementUp && (!d.isMovementUp && "up" == d.yMovement || d.isMovementUp && "down" == d.yMovement) && (d.isMovementUp ? b(".fp-section.active").before(d.activeSection.nextAll(".fp-section")) : b(".fp-section.active").after(d.activeSection.prevAll(".fp-section").get().reverse()), n(b(".fp-section.active").position().top), Z(), d.wrapAroundElements = d.activeSection, d.dest = d.element.position(), d.dtop = d.dest.top, d.yMovement = G(d.element));
				a.addClass("active").siblings().removeClass("active");
				m = !0;
				I(h, g, d.anchorLink, d.sectionIndex);
				b.isFunction(c.onLeave) && !d.localIsResizing && c.onLeave.call(this, d.leavingSection, d.sectionIndex + 1, d.yMovement);
				ua(d);
				p = d.anchorLink;
				c.autoScrolling && H(d.anchorLink, d.sectionIndex)
			}
		}
		function ua(a) {
			if (c.css3 && c.autoScrolling && !c.scrollBar) aa("translate3d(0px, -" + a.dtop + "px, 0px)", !0),
			setTimeout(function() {
				ba(a)
			},
			c.scrollingSpeed);
			else {
				var d = va(a);
				b(d.element).animate(d.options, c.scrollingSpeed, c.easing).promise().done(function() {
					ba(a)
				})
			}
		}
		function va(a) {
			var b = {};
			c.autoScrolling && !c.scrollBar ? (b.options = {
				top: -a.dtop
			},
			b.element = "." + ca) : (b.options = {
				scrollTop: a.dtop
			},
			b.element = "html, body");
			return b
		}
		function wa(a) {
			a.wrapAroundElements && a.wrapAroundElements.length && (a.isMovementUp ? b(".fp-section:first").before(a.wrapAroundElements) : b(".fp-section:last").after(a.wrapAroundElements), n(b(".fp-section.active").position().top), Z())
		}
		function ba(a) {
			wa(a);
			b.isFunction(c.afterLoad) && !a.localIsResizing && c.afterLoad.call(this, a.anchorLink, a.sectionIndex + 1);
			setTimeout(function() {
				m = !1;
				b.isFunction(a.callback) && a.callback.call(this)
			},
			150)
		}
		function da() {
			if (!F) {
				var a = window.location.hash.replace("#", "").split("/"),
				b = a[0],
				a = a[1];
				if (b.length) {
					var c = "undefined" === typeof p,
					f = "undefined" === typeof p && "undefined" === typeof a && !t; (b && b !== p && !c || f || !t && K != a) && L(b, a)
				}
			}
		}
		function w(a, d) {
			var e = d.position(),
			f = a.find(".fp-slidesContainer").parent(),
			g = d.index(),
			h = a.closest(".fp-section"),
			k = h.index(".fp-section"),
			l = h.data("anchor"),
			n = h.find(".fp-slidesNav"),
			m = d.data("anchor"),
			q = x;
			if (c.onSlideLeave) {
				var p = h.find(".fp-slide.active").index(),
				r;
				r = p == g ? "none": p > g ? "left": "right";
				q || "none" === r || b.isFunction(c.onSlideLeave) && c.onSlideLeave.call(this, l, k + 1, p, r)
			}
			d.addClass("active").siblings().removeClass("active");
			"undefined" === typeof m && (m = g); ! c.loopHorizontal && c.controlArrows && (h.find(".fp-controlArrow.fp-prev").toggle(0 != g), h.find(".fp-controlArrow.fp-next").toggle(!d.is(":last-child")));
			h.hasClass("active") && I(g, m, l, k);
			var u = function() {
				q || b.isFunction(c.afterSlideLoad) && c.afterSlideLoad.call(this, l, k + 1, m, g);
				t = !1
			};
			c.css3 ? (e = "translate3d(-" + e.left + "px, 0px, 0px)", ea(a.find(".fp-slidesContainer"), 0 < c.scrollingSpeed).css(fa(e)), setTimeout(function() {
				u()
			},
			c.scrollingSpeed, c.easing)) : f.animate({
				scrollLeft: e.left
			},
			c.scrollingSpeed, c.easing,
			function() {
				u()
			});
			n.find(".active").removeClass("active");
			n.find("li").eq(g).find("a").addClass("active")
		}
		function ga() {
			ha();
			if (C) {
				if ("text" !== b(document.activeElement).attr("type")) {
					var a = b(window).height();
					Math.abs(a - M) > 20 * Math.max(M, a) / 100 && (b.fn.ronbongpage.reBuild(!0), M = a)
				}
			} else clearTimeout(ia),
			ia = setTimeout(function() {
				b.fn.ronbongpage.reBuild(!0)
			},
			500)
		}
		function ha() {
			if (c.responsive) {
				var a = g.hasClass("fp-responsive");
				b(window).width() < c.responsive ? a || (b.fn.ronbongpage.setAutoScrolling(!1, "internal"), b("#fp-nav").hide(), g.addClass("fp-responsive")) : a && (b.fn.ronbongpage.setAutoScrolling(N.autoScrolling, "internal"), b("#fp-nav").show(), g.removeClass("fp-responsive"))
			}
		}
		function ea(a) {
			var b = "all " + c.scrollingSpeed + "ms " + c.easingcss3;
			a.removeClass("fp-notransition");
			return a.css({
				"-webkit-transition": b,
				transition: b
			})
		}
		function O(a) {
			return a.addClass("fp-notransition")
		}
		function xa(a, d) {
			if (825 > a || 900 > d) {
				var c = Math.min(100 * a / 825, 100 * d / 900).toFixed(2);
				b("body").css("font-size", c + "%")
			} else b("body").css("font-size", "100%")
		}
		function H(a, d) {
			c.menu && (b(c.menu).find(".active").removeClass("active"), b(c.menu).find('[data-menuanchor="' + a + '"]').addClass("active"));
			c.navigation && (b("#fp-nav").find(".active").removeClass("active"), a ? b("#fp-nav").find('a[href="#' + a + '"]').addClass("active") : b("#fp-nav").find("li").eq(d).find("a").addClass("active"))
		}
		function G(a) {
			var d = b(".fp-section.active").index(".fp-section");
			a = a.index(".fp-section");
			return d == a ? "none": d > a ? "up": "down"
		}
		function y(a) {
			a.css("overflow", "hidden");
			var b = a.closest(".fp-section"),
			e = a.find(".fp-scrollable");
			if (e.length) var f = e.get(0).scrollHeight;
			else f = a.get(0).scrollHeight,
			c.verticalCentered && (f = a.find(".fp-tableCell").get(0).scrollHeight);
			b = h - parseInt(b.css("padding-bottom")) - parseInt(b.css("padding-top"));
			f > b ? e.length ? e.css("height", b + "px").parent().css("height", b + "px") : (c.verticalCentered ? a.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />') : a.wrapInner('<div class="fp-scrollable" />'), a.find(".fp-scrollable").slimScroll({
				allowPageScroll: !0,
				height: b + "px",
				size: "10px",
				alwaysVisible: !0
			})) : ja(a);
			a.css("overflow", "")
		}
		function ja(a) {
			a.find(".fp-scrollable").children().first().unwrap().unwrap();
			a.find(".slimScrollBar").remove();
			a.find(".slimScrollRail").remove()
		}
		function ka(a) {
			a.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:' + la(a) + 'px;" />')
		}
		function la(a) {
			var b = h;
			if (c.paddingTop || c.paddingBottom) b = a,
			b.hasClass("fp-section") || (b = a.closest(".fp-section")),
			a = parseInt(b.css("padding-top")) + parseInt(b.css("padding-bottom")),
			b = h - a;
			return b
		}
		function aa(a, b) {
			b ? ea(g) : O(g);
			g.css(fa(a));
			setTimeout(function() {
				g.removeClass("fp-notransition")
			},
			10)
		}
		function L(a, d) {
			"undefined" === typeof d && (d = 0);
			var c = isNaN(a) ? b('[data-anchor="' + a + '"]') : b(".fp-section").eq(a - 1);
			a === p || c.hasClass("active") ? ma(c, d) : q(c,
			function() {
				ma(c, d)
			})
		}
		function ma(a, b) {
			if ("undefined" != typeof b) {
				var c = a.find(".fp-slides"),
				f = c.find('[data-anchor="' + b + '"]');
				f.length || (f = c.find(".fp-slide").eq(b));
				f.length && w(c, f)
			}
		}
		function ya(a, b) {
			a.append('<div class="fp-slidesNav"><ul></ul></div>');
			var e = a.find(".fp-slidesNav");
			e.addClass(c.slidesNavPosition);
			for (var f = 0; f < b; f++) e.find("ul").append('<li><a href="#"><span></span></a></li>');
			e.css("margin-left", "-" + e.width() / 2 + "px");
			e.find("li").first().find("a").addClass("active")
		}
		function I(a, b, e, f) {
			var g = "";
			c.anchors.length ? (a ? ("undefined" !== typeof e && (g = e), "undefined" === typeof b && (b = a), K = b, na(g + "/" + b)) : ("undefined" !== typeof a && (K = b), na(e)), D(location.hash)) : "undefined" !== typeof a ? D(f + "-" + a) : D(String(f))
		}
		function na(a) {
			if (c.recordHistory) location.hash = a;
			else if (C || P) history.replaceState(void 0, void 0, "#" + a);
			else {
				var b = window.location.href.split("#")[0];
				window.location.replace(b + "#" + a)
			}
		}
		function D(a) {
			a = a.replace("/", "-").replace("#", "");
			b("body")[0].className = b("body")[0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g, "");
			b("body").addClass("fp-viewing-" + a)
		}
		function za() {
			var a = document.createElement("p"),
			b,
			c = {
				webkitTransform: "-webkit-transform",
				OTransform: "-o-transform",
				msTransform: "-ms-transform",
				MozTransform: "-moz-transform",
				transform: "transform"
			};
			document.body.insertBefore(a, null);
			for (var f in c) void 0 !== a.style[f] && (a.style[f] = "translate3d(1px,1px,1px)", b = window.getComputedStyle(a).getPropertyValue(c[f]));
			document.body.removeChild(a);
			return void 0 !== b && 0 < b.length && "none" !== b
		}
		function oa() {
			return window.PointerEvent ? {
				down: "pointerdown",
				move: "pointermove"
			}: {
				down: "MSPointerDown",
				move: "MSPointerMove"
			}
		}
		function X(a) {
			var b = [];
			b.y = "undefined" !== typeof a.pageY && (a.pageY || a.pageX) ? a.pageY: a.touches[0].pageY;
			b.x = "undefined" !== typeof a.pageX && (a.pageY || a.pageX) ? a.pageX: a.touches[0].pageX;
			return b
		}
		function J(a) {
			b.fn.ronbongpage.setScrollingSpeed(0, "internal");
			w(a.closest(".fp-slides"), a);
			b.fn.ronbongpage.setScrollingSpeed(N.scrollingSpeed, "internal")
		}
		function n(a) {
			c.scrollBar ? g.scrollTop(a) : c.css3 ? aa("translate3d(0px, -" + a + "px, 0px)", !1) : g.css("top", -a)
		}
		function fa(a) {
			return {
				"-webkit-transform": a,
				"-moz-transform": a,
				"-ms-transform": a,
				transform: a
			}
		}
		function Aa() {
			n(0);
			b("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove();
			b(".fp-section").css({
				height: "",
				"background-color": "",
				padding: ""
			});
			b(".fp-slide").css({
				width: ""
			});
			g.css({
				height: "",
				position: "",
				"-ms-touch-action": "",
				"touch-action": ""
			});
			b(".fp-section, .fp-slide").each(function() {
				ja(b(this));
				b(this).removeClass("fp-table active")
			});
			O(g);
			O(g.find(".fp-easing"));
			g.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function() {
				b(this).replaceWith(this.childNodes)
			});
			b("html, body").scrollTop(0)
		}
		function Q(a, b, e) {
			c[a] = b;
			"internal" !== e && (N[a] = b)
		}
		function E(a, b) {
			console && console[a] && console[a]("ronbongpage: " + b)
		}
		c = b.extend({
			menu: !1,
			anchors: [],
			navigation: !1,
			navigationPosition: "right",
			navigationColor: "#000",
			navigationTooltips: [],
			slidesNavigation: !1,
			slidesNavPosition: "bottom",
			scrollBar: !1,
			css3: !0,
			scrollingSpeed: 700,
			autoScrolling: !0,
			easing: "easeInQuart",
			easingcss3: "ease",
			loopBottom: !1,
			loopTop: !1,
			loopHorizontal: !0,
			continuousVertical: !1,
			normalScrollElements: null,
			scrollOverflow: !1,
			touchSensitivity: 5,
			normalScrollElementTouchThreshold: 5,
			keyboardScrolling: !0,
			animateAnchor: !0,
			recordHistory: !0,
			controlArrows: !0,
			controlArrowColor: "#fff",
			verticalCentered: !0,
			resize: !0,
			sectionsColor: [],
			paddingTop: 0,
			paddingBottom: 0,
			fixedElements: null,
			responsive: 0,
			sectionSelector: ".section",
			slideSelector: ".slide",
			afterLoad: null,
			onLeave: null,
			afterRender: null,
			afterResize: null,
			afterReBuild: null,
			afterSlideLoad: null,
			onSlideLeave: null
		},
		c); (function() {
			c.continuousVertical && (c.loopTop || c.loopBottom) && (c.continuousVertical = !1, E("warn", "Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
			c.continuousVertical && c.scrollBar && (c.continuousVertical = !1, E("warn", "Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"));
			b.each(c.anchors,
			function(a, c) { (b("#" + c).length || b('[name="' + c + '"]').length) && E("error", "data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).")
			})
		})();
		b.extend(b.easing, {
			easeInQuart: function(a, b, c, f, g) {
				return f * (b /= g) * b * b * b + c
			}
		});
		b.fn.ronbongpage.setAutoScrolling = function(a, d) {
			Q("autoScrolling", a, d);
			var e = b(".fp-section.active");
			c.autoScrolling && !c.scrollBar ? (b("html, body").css({
				overflow: "hidden",
				height: "100%"
			}), b.fn.ronbongpage.setRecordHistory(c.recordHistory, "internal"), g.css({
				"-ms-touch-action": "none",
				"touch-action": "none"
			}), e.length && n(e.position().top)) : (b("html, body").css({
				overflow: "visible",
				height: "initial"
			}), b.fn.ronbongpage.setRecordHistory(!1, "internal"), g.css({
				"-ms-touch-action": "",
				"touch-action": ""
			}), n(0), b("html, body").scrollTop(e.position().top))
		};
		b.fn.ronbongpage.setRecordHistory = function(a, b) {
			Q("recordHistory", a, b)
		};
		b.fn.ronbongpage.setScrollingSpeed = function(a, b) {
			Q("scrollingSpeed", a, b)
		};
		b.fn.ronbongpage.setMouseWheelScrolling = function(a) {
			a ? document.addEventListener ? (document.addEventListener("mousewheel", r, !1), document.addEventListener("wheel", r, !1)) : document.attachEvent("onmousewheel", r) : document.addEventListener ? (document.removeEventListener("mousewheel", r, !1), document.removeEventListener("wheel", r, !1)) : document.detachEvent("onmousewheel", r)
		};
		b.fn.ronbongpage.setAllowScrolling = function(a, c) {
			if ("undefined" != typeof c) c = c.replace(" ", "").split(","),
			b.each(c,
			function(c, d) {
				switch (d) {
				case "up":
					l.up = a;
					break;
				case "down":
					l.down = a;
					break;
				case "left":
					l.left = a;
					break;
				case "right":
					l.right = a;
					break;
				case "all":
					b.fn.ronbongpage.setAllowScrolling(a)
				}
			});
			else if (a) {
				if (b.fn.ronbongpage.setMouseWheelScrolling(!0), C || P) MSPointer = oa(),
				b(document).off("touchstart " + MSPointer.down).on("touchstart " + MSPointer.down, ta),
				b(document).off("touchmove " + MSPointer.move).on("touchmove " + MSPointer.move, sa)
			} else if (b.fn.ronbongpage.setMouseWheelScrolling(!1), C || P) MSPointer = oa(),
			b(document).off("touchstart " + MSPointer.down),
			b(document).off("touchmove " + MSPointer.move)
		};
		b.fn.ronbongpage.setKeyboardScrolling = function(a) {
			c.keyboardScrolling = a
		};
		b.fn.ronbongpage.moveSectionUp = function() {
			var a = b(".fp-section.active").prev(".fp-section");
			a.length || !c.loopTop && !c.continuousVertical || (a = b(".fp-section").last());
			a.length && q(a, null, !0)
		};
		b.fn.ronbongpage.moveSectionDown = function() {
			var a = b(".fp-section.active").next(".fp-section");
			a.length || !c.loopBottom && !c.continuousVertical || (a = b(".fp-section").first());
			a.length && q(a, null, !1)
		};
		b.fn.ronbongpage.moveTo = function(a, c) {
			var e = "",
			e = isNaN(a) ? b('[data-anchor="' + a + '"]') : b(".fp-section").eq(a - 1);
			"undefined" !== typeof c ? L(a, c) : 0 < e.length && q(e)
		};
		b.fn.ronbongpage.moveSlideRight = function() {
			Y("next")
		};
		b.fn.ronbongpage.moveSlideLeft = function() {
			Y("prev")
		};
		b.fn.ronbongpage.reBuild = function(a) {
			x = !0;
			var d = b(window).width();
			h = b(window).height();
			c.resize && xa(h, d);
			b(".fp-section").each(function() {
				parseInt(b(this).css("padding-bottom"));
				parseInt(b(this).css("padding-top"));
				c.verticalCentered && b(this).find(".fp-tableCell").css("height", la(b(this)) + "px");
				b(this).css("height", h + "px");
				if (c.scrollOverflow) {
					var a = b(this).find(".fp-slide");
					a.length ? a.each(function() {
						y(b(this))
					}) : y(b(this))
				}
				a = b(this).find(".fp-slides");
				a.length && w(a, a.find(".fp-slide.active"))
			});
			b(".fp-section.active").position();
			d = b(".fp-section.active");
			d.index(".fp-section") && q(d);
			x = !1;
			b.isFunction(c.afterResize) && a && c.afterResize.call(this);
			b.isFunction(c.afterReBuild) && !a && c.afterReBuild.call(this)
		};
		var t = !1,
		C = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),
		P = "ontouchstart" in window || 0 < navigator.msMaxTouchPoints || navigator.maxTouchPoints,
		g = b(this),
		h = b(window).height(),
		m = !1,
		x = !1,
		p,
		K,
		k,
		ca = "ronbongpage-wrapper",
		l = {
			up: !0,
			down: !0,
			left: !0,
			right: !0
		},
		N = jQuery.extend(!0, {},
		c);
		b.fn.ronbongpage.setAllowScrolling(!0);
		c.css3 && (c.css3 = za());
		b(this).length ? (g.css({
			height: "100%",
			position: "relative"
		}), g.addClass(ca)) : E("error", "Error! ronbongpage.js needs to be initialized with a selector. For example: $('#myContainer').ronbongpage();");
		b(c.sectionSelector).each(function() {
			b(this).addClass("fp-section")
		});
		b(c.slideSelector).each(function() {
			b(this).addClass("fp-slide")
		});
		c.navigation && qa();
		b(".fp-section").each(function(a) {
			var d = b(this),
			e = b(this).find(".fp-slide"),
			f = e.length;
			a || 0 !== b(".fp-section.active").length || b(this).addClass("active");
			b(this).css("height", h + "px"); (c.paddingTop || c.paddingBottom) && b(this).css("padding", c.paddingTop + " 0 " + c.paddingBottom + " 0");
			"undefined" !== typeof c.sectionsColor[a] && b(this).css("background-color", c.sectionsColor[a]);
			"undefined" !== typeof c.anchors[a] && b(this).attr("data-anchor", c.anchors[a]);
			if (1 < f) {
				a = 100 * f;
				var g = 100 / f;
				e.wrapAll('<div class="fp-slidesContainer" />');
				e.parent().wrap('<div class="fp-slides" />');
				b(this).find(".fp-slidesContainer").css("width", a + "%");
				c.controlArrows && pa(b(this));
				c.slidesNavigation && ya(b(this), f);
				e.each(function(a) {
					b(this).css("width", g + "%");
					c.verticalCentered && ka(b(this))
				});
				d = d.find(".fp-slide.active");
				0 == d.length ? e.eq(0).addClass("active") : J(d)
			} else c.verticalCentered && ka(b(this))
		}).promise().done(function() {
			b.fn.ronbongpage.setAutoScrolling(c.autoScrolling, "internal");
			var a = b(".fp-section.active").find(".fp-slide.active");
			a.length && (0 != b(".fp-section.active").index(".fp-section") || 0 == b(".fp-section.active").index(".fp-section") && 0 != a.index()) && J(a);
			c.fixedElements && c.css3 && b(c.fixedElements).appendTo("body");
			c.navigation && (k.css("margin-top", "-" + k.height() / 2 + "px"), k.find("li").eq(b(".fp-section.active").index(".fp-section")).find("a").addClass("active"));
			c.menu && c.css3 && b(c.menu).closest(".ronbongpage-wrapper").length && b(c.menu).appendTo("body");
			c.scrollOverflow ? ("complete" === document.readyState && R(), b(window).on("load", R)) : b.isFunction(c.afterRender) && c.afterRender.call(this);
			ha();
			a = window.location.hash.replace("#", "").split("/")[0];
			if (a.length) {
				var d = b('[data-anchor="' + a + '"]'); ! c.animateAnchor && d.length && (c.autoScrolling ? n(d.position().top) : (n(0), D(a), b("html, body").scrollTop(d.position().top)), H(a, null), b.isFunction(c.afterLoad) && c.afterLoad.call(this, a, d.index(".fp-section") + 1), d.addClass("active").siblings().removeClass("active"))
			}
			b(window).on("load",
			function() {
				var a = window.location.hash.replace("#", "").split("/"),
				b = a[0],
				a = a[1];
				b && L(b, a)
			})
		});
		var T, U, F = !1;
		b(window).on("scroll", S);
		var v = 0,
		B = 0,
		u = 0,
		A = 0;
		b(window).on("hashchange", da);
		b(document).keydown(function(a) {
			if (c.keyboardScrolling && c.autoScrolling && (40 != a.which && 38 != a.which || a.preventDefault(), !m)) switch (a.which) {
			case 38:
			case 33:
				b.fn.ronbongpage.moveSectionUp();
				break;
			case 40:
			case 34:
				b.fn.ronbongpage.moveSectionDown();
				break;
			case 36:
				b.fn.ronbongpage.moveTo(1);
				break;
			case 35:
				b.fn.ronbongpage.moveTo(b(".fp-section").length);
				break;
			case 37:
				b.fn.ronbongpage.moveSlideLeft();
				break;
			case 39:
				b.fn.ronbongpage.moveSlideRight()
			}
		});
		b(document).on("click touchstart", "#fp-nav a",
		function(a) {
			a.preventDefault();
			a = b(this).parent().index();
			q(b(".fp-section").eq(a))
		});
		b(document).on("click touchstart", ".fp-slidesNav a",
		function(a) {
			a.preventDefault();
			a = b(this).closest(".fp-section").find(".fp-slides");
			var c = a.find(".fp-slide").eq(b(this).closest("li").index());
			w(a, c)
		});
		c.normalScrollElements && (b(document).on("mouseenter", c.normalScrollElements,
		function() {
			b.fn.ronbongpage.setMouseWheelScrolling(!1)
		}), b(document).on("mouseleave", c.normalScrollElements,
		function() {
			b.fn.ronbongpage.setMouseWheelScrolling(!0)
		}));
		b(".fp-section").on("click touchstart", ".fp-controlArrow",
		function() {
			b(this).hasClass("fp-prev") ? b.fn.ronbongpage.moveSlideLeft() : b.fn.ronbongpage.moveSlideRight()
		});
		b(window).resize(ga);
		var M = h,
		ia;
		b.fn.ronbongpage.destroy = function(a) {
			b.fn.ronbongpage.setAutoScrolling(!1, "internal");
			b.fn.ronbongpage.setAllowScrolling(!1);
			b.fn.ronbongpage.setKeyboardScrolling(!1);
			b(window).off("scroll", S).off("hashchange", da).off("resize", ga);
			b(document).off("click", "#fp-nav a").off("mouseenter", "#fp-nav li").off("mouseleave", "#fp-nav li").off("click", ".fp-slidesNav a").off("mouseover", c.normalScrollElements).off("mouseout", c.normalScrollElements);
			b(".fp-section").off("click", ".fp-controlArrow");
			a && Aa()
		}
	}
})(jQuery); (function() {
	'use strict';
	window.Rbslider = function(container, params) {
		if (! (this instanceof Rbslider)) return new Rbslider(container, params);
		var defaults = {
			direction: 'horizontal',
			touchEventsTarget: 'container',
			initialSlide: 0,
			speed: 300,
			autoplay: false,
			autoplayDisableOnInteraction: true,
			freeMode: false,
			freeModeMomentum: true,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: true,
			freeModeMomentumBounceRatio: 1,
			setWrapperSize: false,
			virtualTranslate: false,
			effect: 'slide',
			coverflow: {
				rotate: 50,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true
			},
			cube: {
				slideShadows: true,
				shadow: true,
				shadowOffset: 20,
				shadowScale: 0.94
			},
			fade: {
				crossFade: false
			},
			parallax: false,
			scrollbar: null,
			scrollbarHide: true,
			keyboardControl: false,
			mousewheelControl: false,
			mousewheelForceToAxis: false,
			hashnav: false,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: 'column',
			slidesPerGroup: 1,
			centeredSlides: false,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: true,
			shortSwipes: true,
			longSwipes: true,
			longSwipesRatio: 0.5,
			longSwipesMs: 300,
			followFinger: true,
			onlyExternal: false,
			threshold: 0,
			touchMoveStopPropagation: true,
			pagination: null,
			paginationClickable: false,
			paginationHide: false,
			paginationBulletRender: null,
			resistance: true,
			resistanceRatio: 0.85,
			nextButton: null,
			prevButton: null,
			watchSlidesProgress: false,
			watchSlidesVisibility: false,
			grabCursor: false,
			preventClicks: true,
			preventClicksPropagation: true,
			slideToClickedSlide: false,
			lazyLoading: false,
			lazyLoadingInPrevNext: false,
			lazyLoadingOnTransitionStart: false,
			preloadImages: true,
			updateOnImagesReady: true,
			loop: false,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			control: undefined,
			controlInverse: false,
			allowSwipeToPrev: true,
			allowSwipeToNext: true,
			swipeHandler: null,
			noSwiping: true,
			noSwipingClass: 'rbslider-no-swiping',
			slideClass: 'rbslider-slide',
			slideActiveClass: 'rbslider-slide-active',
			slideVisibleClass: 'rbslider-slide-visible',
			slideDuplicateClass: 'rbslider-slide-duplicate',
			slideNextClass: 'rbslider-slide-next',
			slidePrevClass: 'rbslider-slide-prev',
			wrapperClass: 'rbslider-wrapper',
			bulletClass: 'rbslider-pagination-bullet',
			bulletActiveClass: 'rbslider-pagination-bullet-active',
			buttonDisabledClass: 'rbslider-button-disabled',
			paginationHiddenClass: 'rbslider-pagination-hidden',
			observer: false,
			observeParents: false,
			a11y: false,
			prevSlideMessage: 'Previous slide',
			nextSlideMessage: 'Next slide',
			firstSlideMessage: 'This is the first slide',
			lastSlideMessage: 'This is the last slide',
			runCallbacksOnInit: true,
		};
		var initalVirtualTranslate = params && params.virtualTranslate;
		params = params || {};
		for (var def in defaults) {
			if (typeof params[def] === 'undefined') {
				params[def] = defaults[def]
			} else if (typeof params[def] === 'object') {
				for (var deepDef in defaults[def]) {
					if (typeof params[def][deepDef] === 'undefined') {
						params[def][deepDef] = defaults[def][deepDef]
					}
				}
			}
		}
		var s = this;
		s.params = params;
		s.classNames = [];
		var $;
		if (typeof Dom7 === 'undefined') {
			$ = window.Dom7 || window.Zepto || window.jQuery
		} else {
			$ = Dom7
		}
		if (!$) return;
		s.$ = $;
		s.container = $(container);
		if (s.container.length === 0) return;
		if (s.container.length > 1) {
			s.container.each(function() {
				new Rbslider(this, params)
			});
			return
		}
		s.container[0].rbslider = s;
		s.container.data('rbslider', s);
		s.classNames.push('rbslider-container-' + s.params.direction);
		if (s.params.freeMode) {
			s.classNames.push('rbslider-container-free-mode')
		}
		if (!s.support.flexbox) {
			s.classNames.push('rbslider-container-no-flexbox');
			s.params.slidesPerColumn = 1
		}
		if (s.params.parallax || s.params.watchSlidesVisibility) {
			s.params.watchSlidesProgress = true
		}
		if (['cube', 'coverflow'].indexOf(s.params.effect) >= 0) {
			if (s.support.transforms3d) {
				s.params.watchSlidesProgress = true;
				s.classNames.push('rbslider-container-3d')
			} else {
				s.params.effect = 'slide'
			}
		}
		if (s.params.effect !== 'slide') {
			s.classNames.push('rbslider-container-' + s.params.effect)
		}
		if (s.params.effect === 'cube') {
			s.params.resistanceRatio = 0;
			s.params.slidesPerView = 1;
			s.params.slidesPerColumn = 1;
			s.params.slidesPerGroup = 1;
			s.params.centeredSlides = false;
			s.params.spaceBetween = 0;
			s.params.virtualTranslate = true;
			s.params.setWrapperSize = false
		}
		if (s.params.effect === 'fade') {
			s.params.slidesPerView = 1;
			s.params.slidesPerColumn = 1;
			s.params.slidesPerGroup = 1;
			s.params.watchSlidesProgress = true;
			s.params.spaceBetween = 0;
			if (typeof initalVirtualTranslate === 'undefined') {
				s.params.virtualTranslate = true
			}
		}
		if (s.params.grabCursor && s.support.touch) {
			s.params.grabCursor = false
		}
		s.wrapper = s.container.children('.' + s.params.wrapperClass);
		if (s.params.pagination) {
			s.paginationContainer = $(s.params.pagination);
			if (s.params.paginationClickable) {
				s.paginationContainer.addClass('rbslider-pagination-clickable')
			}
		}
		function isH() {
			return s.params.direction === 'horizontal'
		}
		s.rtl = isH() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
		if (s.rtl) {
			s.classNames.push('rbslider-container-rtl')
		}
		if (s.rtl) {
			s.wrongRTL = s.wrapper.css('display') === '-webkit-box'
		}
		if (s.params.slidesPerColumn > 1) {
			s.classNames.push('rbslider-container-multirow')
		}
		if (s.device.android) {
			s.classNames.push('rbslider-container-android')
		}
		s.container.addClass(s.classNames.join(' '));
		s.translate = 0;
		s.progress = 0;
		s.velocity = 0;
		s.lockSwipeToNext = function() {
			s.params.allowSwipeToNext = false
		};
		s.lockSwipeToPrev = function() {
			s.params.allowSwipeToPrev = false
		};
		s.lockSwipes = function() {
			s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false
		};
		s.unlockSwipeToNext = function() {
			s.params.allowSwipeToNext = true
		};
		s.unlockSwipeToPrev = function() {
			s.params.allowSwipeToPrev = true
		};
		s.unlockSwipes = function() {
			s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true
		};
		if (s.params.grabCursor) {
			s.container[0].style.cursor = 'move';
			s.container[0].style.cursor = '-webkit-grab';
			s.container[0].style.cursor = '-moz-grab';
			s.container[0].style.cursor = 'grab'
		}
		s.imagesToLoad = [];
		s.imagesLoaded = 0;
		s.loadImage = function(imgElement, src, checkForComplete, callback) {
			var image;
			function onReady() {
				if (callback) callback()
			}
			if (!imgElement.complete || !checkForComplete) {
				if (src) {
					image = new Image();
					image.onload = onReady;
					image.onerror = onReady;
					image.src = src
				} else {
					onReady()
				}
			} else {
				onReady()
			}
		};
		s.preloadImages = function() {
			s.imagesToLoad = s.container.find('img');
			function _onReady() {
				if (typeof s === 'undefined' || s === null) return;
				if (s.imagesLoaded !== undefined) s.imagesLoaded++;
				if (s.imagesLoaded === s.imagesToLoad.length) {
					if (s.params.updateOnImagesReady) s.update();
					s.emit('onImagesReady', s)
				}
			}
			for (var i = 0; i < s.imagesToLoad.length; i++) {
				s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), true, _onReady)
			}
		};
		s.autoplayTimeoutId = undefined;
		s.autoplaying = false;
		s.autoplayPaused = false;
		function autoplay() {
			s.autoplayTimeoutId = setTimeout(function() {
				if (s.params.loop) {
					s.fixLoop();
					s._slideNext()
				} else {
					if (!s.isEnd) {
						s._slideNext()
					} else {
						if (!params.autoplayStopOnLast) {
							s._slideTo(0)
						} else {
							s.stopAutoplay()
						}
					}
				}
			},
			s.params.autoplay)
		}
		s.startAutoplay = function() {
			if (typeof s.autoplayTimeoutId !== 'undefined') return false;
			if (!s.params.autoplay) return false;
			if (s.autoplaying) return false;
			s.autoplaying = true;
			s.emit('onAutoplayStart', s);
			autoplay()
		};
		s.stopAutoplay = function(internal) {
			if (!s.autoplayTimeoutId) return;
			if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
			s.autoplaying = false;
			s.autoplayTimeoutId = undefined;
			s.emit('onAutoplayStop', s)
		};
		s.pauseAutoplay = function(speed) {
			if (s.autoplayPaused) return;
			if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
			s.autoplayPaused = true;
			if (speed === 0) {
				s.autoplayPaused = false;
				autoplay()
			} else {
				s.wrapper.transitionEnd(function() {
					s.autoplayPaused = false;
					if (!s.autoplaying) {
						s.stopAutoplay()
					} else {
						autoplay()
					}
				})
			}
		};
		s.minTranslate = function() {
			return ( - s.snapGrid[0])
		};
		s.maxTranslate = function() {
			return ( - s.snapGrid[s.snapGrid.length - 1])
		};
		s.updateContainerSize = function() {
			s.width = s.container[0].clientWidth;
			s.height = s.container[0].clientHeight;
			s.size = isH() ? s.width: s.height
		};
		s.updateSlidesSize = function() {
			s.slides = s.wrapper.children('.' + s.params.slideClass);
			s.snapGrid = [];
			s.slidesGrid = [];
			s.slidesSizesGrid = [];
			var spaceBetween = s.params.spaceBetween,
			slidePosition = 0,
			i, prevSlideSize = 0,
			index = 0;
			if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
				spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size
			}
			s.virtualSize = -spaceBetween;
			if (s.rtl) s.slides.css({
				marginLeft: '',
				marginTop: ''
			});
			else s.slides.css({
				marginRight: '',
				marginBottom: ''
			});
			var slidesNumberEvenToRows;
			if (s.params.slidesPerColumn > 1) {
				if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
					slidesNumberEvenToRows = s.slides.length
				} else {
					slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn
				}
			}
			var slideSize;
			for (i = 0; i < s.slides.length; i++) {
				slideSize = 0;
				var slide = s.slides.eq(i);
				if (s.params.slidesPerColumn > 1) {
					var newSlideOrderIndex;
					var column, row;
					var slidesPerColumn = s.params.slidesPerColumn;
					var slidesPerRow;
					if (s.params.slidesPerColumnFill === 'column') {
						column = Math.floor(i / slidesPerColumn);
						row = i - column * slidesPerColumn;
						newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
						slide.css({
							'-webkit-box-ordinal-group': newSlideOrderIndex,
							'-moz-box-ordinal-group': newSlideOrderIndex,
							'-ms-flex-order': newSlideOrderIndex,
							'-webkit-order': newSlideOrderIndex,
							'order': newSlideOrderIndex
						})
					} else {
						slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
						row = Math.floor(i / slidesPerRow);
						column = i - row * slidesPerRow
					}
					slide.css({
						'margin-top': (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
					}).attr('data-rbslider-column', column).attr('data-rbslider-row', row)
				}
				if (slide.css('display') === 'none') continue;
				if (s.params.slidesPerView === 'auto') {
					slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true)
				} else {
					slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
					if (isH()) {
						s.slides[i].style.width = slideSize + 'px'
					} else {
						s.slides[i].style.height = slideSize + 'px'
					}
				}
				s.slides[i].rbsliderSlideSize = slideSize;
				s.slidesSizesGrid.push(slideSize);
				if (s.params.centeredSlides) {
					slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
					if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
					if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
					if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
					s.slidesGrid.push(slidePosition)
				} else {
					if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
					s.slidesGrid.push(slidePosition);
					slidePosition = slidePosition + slideSize + spaceBetween
				}
				s.virtualSize += slideSize + spaceBetween;
				prevSlideSize = slideSize;
				index++
			}
			s.virtualSize = Math.max(s.virtualSize, s.size);
			var newSlidesGrid;
			if (s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
				s.wrapper.css({
					width: s.virtualSize + s.params.spaceBetween + 'px'
				})
			}
			if (!s.support.flexbox || s.params.setWrapperSize) {
				if (isH()) s.wrapper.css({
					width: s.virtualSize + s.params.spaceBetween + 'px'
				});
				else s.wrapper.css({
					height: s.virtualSize + s.params.spaceBetween + 'px'
				})
			}
			if (s.params.slidesPerColumn > 1) {
				s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
				s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
				s.wrapper.css({
					width: s.virtualSize + s.params.spaceBetween + 'px'
				});
				if (s.params.centeredSlides) {
					newSlidesGrid = [];
					for (i = 0; i < s.snapGrid.length; i++) {
						if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i])
					}
					s.snapGrid = newSlidesGrid
				}
			}
			if (!s.params.centeredSlides) {
				newSlidesGrid = [];
				for (i = 0; i < s.snapGrid.length; i++) {
					if (s.snapGrid[i] <= s.virtualSize - s.size) {
						newSlidesGrid.push(s.snapGrid[i])
					}
				}
				s.snapGrid = newSlidesGrid;
				if (Math.floor(s.virtualSize - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
					s.snapGrid.push(s.virtualSize - s.size)
				}
			}
			if (s.snapGrid.length === 0) s.snapGrid = [0];
			if (s.params.spaceBetween !== 0) {
				if (isH()) {
					if (s.rtl) s.slides.css({
						marginLeft: spaceBetween + 'px'
					});
					else s.slides.css({
						marginRight: spaceBetween + 'px'
					})
				} else s.slides.css({
					marginBottom: spaceBetween + 'px'
				})
			}
			if (s.params.watchSlidesProgress) {
				s.updateSlidesOffset()
			}
		};
		s.updateSlidesOffset = function() {
			for (var i = 0; i < s.slides.length; i++) {
				s.slides[i].rbsliderSlideOffset = isH() ? s.slides[i].offsetLeft: s.slides[i].offsetTop
			}
		};
		s.updateSlidesProgress = function(translate) {
			if (typeof translate === 'undefined') {
				translate = s.translate || 0
			}
			if (s.slides.length === 0) return;
			if (typeof s.slides[0].rbsliderSlideOffset === 'undefined') s.updateSlidesOffset();
			var offsetCenter = s.params.centeredSlides ? -translate + s.size / 2 : -translate;
			if (s.rtl) offsetCenter = s.params.centeredSlides ? translate - s.size / 2 : translate;
			var containerBox = s.container[0].getBoundingClientRect();
			var sideBefore = isH() ? 'left': 'top';
			var sideAfter = isH() ? 'right': 'bottom';
			s.slides.removeClass(s.params.slideVisibleClass);
			for (var i = 0; i < s.slides.length; i++) {
				var slide = s.slides[i];
				var slideCenterOffset = (s.params.centeredSlides === true) ? slide.rbsliderSlideSize / 2 : 0;
				var slideProgress = (offsetCenter - slide.rbsliderSlideOffset - slideCenterOffset) / (slide.rbsliderSlideSize + s.params.spaceBetween);
				if (s.params.watchSlidesVisibility) {
					var slideBefore = -(offsetCenter - slide.rbsliderSlideOffset - slideCenterOffset);
					var slideAfter = slideBefore + s.slidesSizesGrid[i];
					var isVisible = (slideBefore >= 0 && slideBefore < s.size) || (slideAfter > 0 && slideAfter <= s.size) || (slideBefore <= 0 && slideAfter >= s.size);
					if (isVisible) {
						s.slides.eq(i).addClass(s.params.slideVisibleClass)
					}
				}
				slide.progress = s.rtl ? -slideProgress: slideProgress
			}
		};
		s.updateProgress = function(translate) {
			if (typeof translate === 'undefined') {
				translate = s.translate || 0
			}
			var translatesDiff = s.maxTranslate() - s.minTranslate();
			if (translatesDiff === 0) {
				s.progress = 0;
				s.isBeginning = s.isEnd = true
			} else {
				s.progress = (translate - s.minTranslate()) / (translatesDiff);
				s.isBeginning = s.progress <= 0;
				s.isEnd = s.progress >= 1
			}
			if (s.isBeginning) s.emit('onReachBeginning', s);
			if (s.isEnd) s.emit('onReachEnd', s);
			if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
			s.emit('onProgress', s, s.progress)
		};
		s.updateActiveIndex = function() {
			var translate = s.rtl ? s.translate: -s.translate;
			var newActiveIndex, i, snapIndex;
			for (i = 0; i < s.slidesGrid.length; i++) {
				if (typeof s.slidesGrid[i + 1] !== 'undefined') {
					if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
						newActiveIndex = i
					} else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
						newActiveIndex = i + 1
					}
				} else {
					if (translate >= s.slidesGrid[i]) {
						newActiveIndex = i
					}
				}
			}
			if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
			snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
			if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
			if (newActiveIndex === s.activeIndex) {
				return
			}
			s.snapIndex = snapIndex;
			s.previousIndex = s.activeIndex;
			s.activeIndex = newActiveIndex;
			s.updateClasses()
		};
		s.updateClasses = function() {
			s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
			var activeSlide = s.slides.eq(s.activeIndex);
			activeSlide.addClass(s.params.slideActiveClass);
			activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
			activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
			if (s.bullets && s.bullets.length > 0) {
				s.bullets.removeClass(s.params.bulletActiveClass);
				var bulletIndex;
				if (s.params.loop) {
					bulletIndex = Math.ceil(s.activeIndex - s.loopedSlides) / s.params.slidesPerGroup;
					if (bulletIndex > s.slides.length - 1 - s.loopedSlides * 2) {
						bulletIndex = bulletIndex - (s.slides.length - s.loopedSlides * 2)
					}
					if (bulletIndex > s.bullets.length - 1) bulletIndex = bulletIndex - s.bullets.length
				} else {
					if (typeof s.snapIndex !== 'undefined') {
						bulletIndex = s.snapIndex
					} else {
						bulletIndex = s.activeIndex || 0
					}
				}
				if (s.paginationContainer.length > 1) {
					s.bullets.each(function() {
						if ($(this).index() === bulletIndex) $(this).addClass(s.params.bulletActiveClass)
					})
				} else {
					s.bullets.eq(bulletIndex).addClass(s.params.bulletActiveClass)
				}
			}
			if (!s.params.loop) {
				if (s.params.prevButton) {
					if (s.isBeginning) {
						$(s.params.prevButton).addClass(s.params.buttonDisabledClass);
						if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.prevButton))
					} else {
						$(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
						if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.prevButton))
					}
				}
				if (s.params.nextButton) {
					if (s.isEnd) {
						$(s.params.nextButton).addClass(s.params.buttonDisabledClass);
						if (s.params.a11y && s.a11y) s.a11y.disable($(s.params.nextButton))
					} else {
						$(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
						if (s.params.a11y && s.a11y) s.a11y.enable($(s.params.nextButton))
					}
				}
			}
		};
		s.updatePagination = function() {
			if (!s.params.pagination) return;
			if (s.paginationContainer && s.paginationContainer.length > 0) {
				var bulletsHTML = '';
				var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
				for (var i = 0; i < numberOfBullets; i++) {
					if (s.params.paginationBulletRender) {
						bulletsHTML += s.params.paginationBulletRender(i, s.params.bulletClass)
					} else {
						bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>'
					}
				}
				s.paginationContainer.html(bulletsHTML);
				s.bullets = s.paginationContainer.find('.' + s.params.bulletClass)
			}
		};
		s.update = function(updateTranslate) {
			s.updateContainerSize();
			s.updateSlidesSize();
			s.updateProgress();
			s.updatePagination();
			s.updateClasses();
			if (s.params.scrollbar && s.scrollbar) {
				s.scrollbar.set()
			}
			function forceSetTranslate() {
				newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
				s.setWrapperTranslate(newTranslate);
				s.updateActiveIndex();
				s.updateClasses()
			}
			if (updateTranslate) {
				var translated, newTranslate;
				if (s.params.freeMode) {
					forceSetTranslate()
				} else {
					if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
						translated = s.slideTo(s.slides.length - 1, 0, false, true)
					} else {
						translated = s.slideTo(s.activeIndex, 0, false, true)
					}
					if (!translated) {
						forceSetTranslate()
					}
				}
			}
		};
		s.onResize = function() {
			s.updateContainerSize();
			s.updateSlidesSize();
			s.updateProgress();
			if (s.params.slidesPerView === 'auto' || s.params.freeMode) s.updatePagination();
			if (s.params.scrollbar && s.scrollbar) {
				s.scrollbar.set()
			}
			if (s.params.freeMode) {
				var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
				s.setWrapperTranslate(newTranslate);
				s.updateActiveIndex();
				s.updateClasses()
			} else {
				s.updateClasses();
				if (s.params.slidesPerView === 'auto' && s.isEnd && !s.params.centeredSlides) {
					s.slideTo(s.slides.length - 1, 0, false, true)
				} else {
					s.slideTo(s.activeIndex, 0, false, true)
				}
			}
		};
		var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
		if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
		else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
		s.touchEvents = {
			start: s.support.touch || !s.params.simulateTouch ? 'touchstart': desktopEvents[0],
			move: s.support.touch || !s.params.simulateTouch ? 'touchmove': desktopEvents[1],
			end: s.support.touch || !s.params.simulateTouch ? 'touchend': desktopEvents[2]
		};
		if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) { (s.params.touchEventsTarget === 'container' ? s.container: s.wrapper).addClass('rbslider-wp8-' + s.params.direction)
		}
		s.initEvents = function(detach) {
			var actionDom = detach ? 'off': 'on';
			var action = detach ? 'removeEventListener': 'addEventListener';
			var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
			var target = s.support.touch ? touchEventsTarget: document;
			var moveCapture = s.params.nested ? true: false;
			if (s.browser.ie) {
				touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
				target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
				target[action](s.touchEvents.end, s.onTouchEnd, false)
			} else {
				if (s.support.touch) {
					touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
					touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
					touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, false)
				}
				if (params.simulateTouch && !s.device.ios && !s.device.android) {
					touchEventsTarget[action]('mousedown', s.onTouchStart, false);
					target[action]('mousemove', s.onTouchMove, moveCapture);
					target[action]('mouseup', s.onTouchEnd, false)
				}
			}
			window[action]('resize', s.onResize);
			if (s.params.nextButton) {
				$(s.params.nextButton)[actionDom]('click', s.onClickNext);
				if (s.params.a11y && s.a11y) $(s.params.nextButton)[actionDom]('keydown', s.a11y.onEnterKey)
			}
			if (s.params.prevButton) {
				$(s.params.prevButton)[actionDom]('click', s.onClickPrev);
				if (s.params.a11y && s.a11y) $(s.params.prevButton)[actionDom]('keydown', s.a11y.onEnterKey)
			}
			if (s.params.pagination && s.params.paginationClickable) {
				$(s.paginationContainer)[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex)
			}
			if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true)
		};
		s.attachEvents = function(detach) {
			s.initEvents()
		};
		s.detachEvents = function() {
			s.initEvents(true)
		};
		s.allowClick = true;
		s.preventClicks = function(e) {
			if (!s.allowClick) {
				if (s.params.preventClicks) e.preventDefault();
				if (s.params.preventClicksPropagation) {
					e.stopPropagation();
					e.stopImmediatePropagation()
				}
			}
		};
		s.onClickNext = function(e) {
			e.preventDefault();
			s.slideNext()
		};
		s.onClickPrev = function(e) {
			e.preventDefault();
			s.slidePrev()
		};
		s.onClickIndex = function(e) {
			e.preventDefault();
			var index = $(this).index() * s.params.slidesPerGroup;
			if (s.params.loop) index = index + s.loopedSlides;
			s.slideTo(index)
		};
		function findElementInEvent(e, selector) {
			var el = $(e.target);
			if (!el.is(selector)) {
				if (typeof selector === 'string') {
					el = el.parents(selector)
				} else if (selector.nodeType) {
					var found;
					el.parents().each(function(index, _el) {
						if (_el === selector) found = selector
					});
					if (!found) return undefined;
					else return selector
				}
			}
			if (el.length === 0) {
				return undefined
			}
			return el[0]
		}
		s.updateClickedSlide = function(e) {
			var slide = findElementInEvent(e, '.' + s.params.slideClass);
			if (slide) {
				s.clickedSlide = slide;
				s.clickedIndex = $(slide).index()
			} else {
				s.clickedSlide = undefined;
				s.clickedIndex = undefined;
				return
			}
			if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
				var slideToIndex = s.clickedIndex,
				realIndex;
				if (s.params.loop) {
					realIndex = $(s.clickedSlide).attr('data-rbslider-slide-index');
					if (slideToIndex > s.slides.length - s.params.slidesPerView) {
						s.fixLoop();
						slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-rbslider-slide-index="' + realIndex + '"]').eq(0).index();
						setTimeout(function() {
							s.slideTo(slideToIndex)
						},
						0)
					} else if (slideToIndex < s.params.slidesPerView - 1) {
						s.fixLoop();
						var duplicatedSlides = s.wrapper.children('.' + s.params.slideClass + '[data-rbslider-slide-index="' + realIndex + '"]');
						slideToIndex = duplicatedSlides.eq(duplicatedSlides.length - 1).index();
						setTimeout(function() {
							s.slideTo(slideToIndex)
						},
						0)
					} else {
						s.slideTo(slideToIndex)
					}
				} else {
					s.slideTo(slideToIndex)
				}
			}
		};
		var isTouched, isMoved, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove, formElements = 'input, select, textarea, button',
		lastClickTime = Date.now(),
		clickTimeout,
		velocities = [],
		allowMomentumBounce;
		s.animating = false;
		s.touches = {
			startX: 0,
			startY: 0,
			currentX: 0,
			currentY: 0,
			diff: 0
		};
		var isTouchEvent, startMoving;
		s.onTouchStart = function(e) {
			if (e.originalEvent) e = e.originalEvent;
			isTouchEvent = e.type === 'touchstart';
			if (!isTouchEvent && 'which' in e && e.which === 3) return;
			if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
				s.allowClick = true;
				return
			}
			if (s.params.swipeHandler) {
				if (!findElementInEvent(e, s.params.swipeHandler)) return
			}
			isTouched = true;
			isMoved = false;
			isScrolling = undefined;
			startMoving = undefined;
			s.touches.startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX: e.pageX;
			s.touches.startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY: e.pageY;
			touchStartTime = Date.now();
			s.allowClick = true;
			s.updateContainerSize();
			s.swipeDirection = undefined;
			if (s.params.threshold > 0) allowThresholdMove = false;
			if (e.type !== 'touchstart') {
				var preventDefault = true;
				if ($(e.target).is(formElements)) preventDefault = false;
				if (document.activeElement && $(document.activeElement).is(formElements)) {
					document.activeElement.blur()
				}
				if (preventDefault) {
					e.preventDefault()
				}
			}
			s.emit('onTouchStart', s, e)
		};
		s.onTouchMove = function(e) {
			if (e.originalEvent) e = e.originalEvent;
			if (isTouchEvent && e.type === 'mousemove') return;
			if (e.preventedByNestedRbslider) return;
			if (s.params.onlyExternal) {
				isMoved = true;
				s.allowClick = false;
				return
			}
			if (isTouchEvent && document.activeElement) {
				if (e.target === document.activeElement && $(e.target).is(formElements)) {
					isMoved = true;
					s.allowClick = false;
					return
				}
			}
			s.emit('onTouchMove', s, e);
			if (e.targetTouches && e.targetTouches.length > 1) return;
			s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX: e.pageX;
			s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY: e.pageY;
			if (typeof isScrolling === 'undefined') {
				var touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
				isScrolling = isH() ? touchAngle > s.params.touchAngle: (90 - touchAngle > s.params.touchAngle)
			}
			if (isScrolling) {
				s.emit('onTouchMoveOpposite', s, e)
			}
			if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
				if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
					startMoving = true
				}
			}
			if (!isTouched) return;
			if (isScrolling) {
				isTouched = false;
				return
			}
			if (!startMoving && s.browser.ieTouch) {
				return
			}
			s.allowClick = false;
			s.emit('onSliderMove', s, e);
			e.preventDefault();
			if (s.params.touchMoveStopPropagation && !s.params.nested) {
				e.stopPropagation()
			}
			if (!isMoved) {
				if (params.loop) {
					s.fixLoop()
				}
				startTranslate = s.getWrapperTranslate();
				s.setWrapperTransition(0);
				if (s.animating) {
					s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd')
				}
				if (s.params.autoplay && s.autoplaying) {
					if (s.params.autoplayDisableOnInteraction) {
						s.stopAutoplay()
					} else {
						s.pauseAutoplay()
					}
				}
				allowMomentumBounce = false;
				if (s.params.grabCursor) {
					s.container[0].style.cursor = 'move';
					s.container[0].style.cursor = '-webkit-grabbing';
					s.container[0].style.cursor = '-moz-grabbin';
					s.container[0].style.cursor = 'grabbing'
				}
			}
			isMoved = true;
			var diff = s.touches.diff = isH() ? s.touches.currentX - s.touches.startX: s.touches.currentY - s.touches.startY;
			diff = diff * s.params.touchRatio;
			if (s.rtl) diff = -diff;
			s.swipeDirection = diff > 0 ? 'prev': 'next';
			currentTranslate = diff + startTranslate;
			var disableParentRbslider = true;
			if ((diff > 0 && currentTranslate > s.minTranslate())) {
				disableParentRbslider = false;
				if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow( - s.minTranslate() + startTranslate + diff, s.params.resistanceRatio)
			} else if (diff < 0 && currentTranslate < s.maxTranslate()) {
				disableParentRbslider = false;
				if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio)
			}
			if (disableParentRbslider) {
				e.preventedByNestedRbslider = true
			}
			if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
				currentTranslate = startTranslate
			}
			if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
				currentTranslate = startTranslate
			}
			if (!s.params.followFinger) return;
			if (s.params.threshold > 0) {
				if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
					if (!allowThresholdMove) {
						allowThresholdMove = true;
						s.touches.startX = s.touches.currentX;
						s.touches.startY = s.touches.currentY;
						currentTranslate = startTranslate;
						s.touches.diff = isH() ? s.touches.currentX - s.touches.startX: s.touches.currentY - s.touches.startY;
						return
					}
				} else {
					currentTranslate = startTranslate;
					return
				}
			}
			if (s.params.freeMode || s.params.watchSlidesProgress) {
				s.updateActiveIndex()
			}
			if (s.params.freeMode) {
				if (velocities.length === 0) {
					velocities.push({
						position: s.touches[isH() ? 'startX': 'startY'],
						time: touchStartTime
					})
				}
				velocities.push({
					position: s.touches[isH() ? 'currentX': 'currentY'],
					time: (new Date()).getTime()
				})
			}
			s.updateProgress(currentTranslate);
			s.setWrapperTranslate(currentTranslate)
		};
		s.onTouchEnd = function(e) {
			if (e.originalEvent) e = e.originalEvent;
			s.emit('onTouchEnd', s, e);
			if (!isTouched) return;
			if (s.params.grabCursor && isMoved && isTouched) {
				s.container[0].style.cursor = 'move';
				s.container[0].style.cursor = '-webkit-grab';
				s.container[0].style.cursor = '-moz-grab';
				s.container[0].style.cursor = 'grab'
			}
			var touchEndTime = Date.now();
			var timeDiff = touchEndTime - touchStartTime;
			if (s.allowClick) {
				s.updateClickedSlide(e);
				s.emit('onTap', s, e);
				if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
					if (clickTimeout) clearTimeout(clickTimeout);
					clickTimeout = setTimeout(function() {
						if (!s) return;
						if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
							s.paginationContainer.toggleClass(s.params.paginationHiddenClass)
						}
						s.emit('onClick', s, e)
					},
					300)
				}
				if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
					if (clickTimeout) clearTimeout(clickTimeout);
					s.emit('onDoubleTap', s, e)
				}
			}
			lastClickTime = Date.now();
			setTimeout(function() {
				if (s && s.allowClick) s.allowClick = true
			},
			0);
			if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
				isTouched = isMoved = false;
				return
			}
			isTouched = isMoved = false;
			var currentPos;
			if (s.params.followFinger) {
				currentPos = s.rtl ? s.translate: -s.translate
			} else {
				currentPos = -currentTranslate
			}
			if (s.params.freeMode) {
				if (currentPos < -s.minTranslate()) {
					s.slideTo(s.activeIndex);
					return
				} else if (currentPos > -s.maxTranslate()) {
					s.slideTo(s.slides.length - 1);
					return
				}
				if (s.params.freeModeMomentum) {
					if (velocities.length > 1) {
						var lastMoveEvent = velocities.pop(),
						velocityEvent = velocities.pop();
						var distance = lastMoveEvent.position - velocityEvent.position;
						var time = lastMoveEvent.time - velocityEvent.time;
						s.velocity = distance / time;
						s.velocity = s.velocity / 2;
						if (Math.abs(s.velocity) < 0.02) {
							s.velocity = 0
						}
						if (time > 150 || (new Date().getTime() - lastMoveEvent.time) > 300) {
							s.velocity = 0
						}
					} else {
						s.velocity = 0
					}
					velocities.length = 0;
					var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
					var momentumDistance = s.velocity * momentumDuration;
					var newPosition = s.translate + momentumDistance;
					if (s.rtl) newPosition = -newPosition;
					var doBounce = false;
					var afterBouncePosition;
					var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
					if (newPosition < s.maxTranslate()) {
						if (s.params.freeModeMomentumBounce) {
							if (newPosition + s.maxTranslate() < -bounceAmount) {
								newPosition = s.maxTranslate() - bounceAmount
							}
							afterBouncePosition = s.maxTranslate();
							doBounce = true;
							allowMomentumBounce = true
						} else {
							newPosition = s.maxTranslate()
						}
					}
					if (newPosition > s.minTranslate()) {
						if (s.params.freeModeMomentumBounce) {
							if (newPosition - s.minTranslate() > bounceAmount) {
								newPosition = s.minTranslate() + bounceAmount
							}
							afterBouncePosition = s.minTranslate();
							doBounce = true;
							allowMomentumBounce = true
						} else {
							newPosition = s.minTranslate()
						}
					}
					if (s.velocity !== 0) {
						if (s.rtl) {
							momentumDuration = Math.abs(( - newPosition - s.translate) / s.velocity)
						} else {
							momentumDuration = Math.abs((newPosition - s.translate) / s.velocity)
						}
					}
					if (s.params.freeModeMomentumBounce && doBounce) {
						s.updateProgress(afterBouncePosition);
						s.setWrapperTransition(momentumDuration);
						s.setWrapperTranslate(newPosition);
						s.onTransitionStart();
						s.animating = true;
						s.wrapper.transitionEnd(function() {
							if (!allowMomentumBounce) return;
							s.emit('onMomentumBounce', s);
							s.setWrapperTransition(s.params.speed);
							s.setWrapperTranslate(afterBouncePosition);
							s.wrapper.transitionEnd(function() {
								s.onTransitionEnd()
							})
						})
					} else if (s.velocity) {
						s.updateProgress(newPosition);
						s.setWrapperTransition(momentumDuration);
						s.setWrapperTranslate(newPosition);
						s.onTransitionStart();
						if (!s.animating) {
							s.animating = true;
							s.wrapper.transitionEnd(function() {
								s.onTransitionEnd()
							})
						}
					} else {
						s.updateProgress(newPosition)
					}
					s.updateActiveIndex()
				}
				if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
					s.updateProgress();
					s.updateActiveIndex()
				}
				return
			}
			var i, stopIndex = 0,
			groupSize = s.slidesSizesGrid[0];
			for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
				if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
					if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
						stopIndex = i;
						groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i]
					}
				} else {
					if (currentPos >= s.slidesGrid[i]) {
						stopIndex = i;
						groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2]
					}
				}
			}
			var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
			if (timeDiff > s.params.longSwipesMs) {
				if (!s.params.longSwipes) {
					s.slideTo(s.activeIndex);
					return
				}
				if (s.swipeDirection === 'next') {
					if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
					else s.slideTo(stopIndex)
				}
				if (s.swipeDirection === 'prev') {
					if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
					else s.slideTo(stopIndex)
				}
			} else {
				if (!s.params.shortSwipes) {
					s.slideTo(s.activeIndex);
					return
				}
				if (s.swipeDirection === 'next') {
					s.slideTo(stopIndex + s.params.slidesPerGroup)
				}
				if (s.swipeDirection === 'prev') {
					s.slideTo(stopIndex)
				}
			}
		};
		s._slideTo = function(slideIndex, speed) {
			return s.slideTo(slideIndex, speed, true, true)
		};
		s.slideTo = function(slideIndex, speed, runCallbacks, internal) {
			if (typeof runCallbacks === 'undefined') runCallbacks = true;
			if (typeof slideIndex === 'undefined') slideIndex = 0;
			if (slideIndex < 0) slideIndex = 0;
			s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
			if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
			var translate = -s.snapGrid[s.snapIndex];
			if (s.params.autoplay && s.autoplaying) {
				if (internal || !s.params.autoplayDisableOnInteraction) {
					s.pauseAutoplay(speed)
				} else {
					s.stopAutoplay()
				}
			}
			s.updateProgress(translate);
			for (var i = 0; i < s.slidesGrid.length; i++) {
				if ( - translate >= s.slidesGrid[i]) {
					slideIndex = i
				}
			}
			if (typeof speed === 'undefined') speed = s.params.speed;
			s.previousIndex = s.activeIndex || 0;
			s.activeIndex = slideIndex;
			if (translate === s.translate) {
				s.updateClasses();
				return false
			}
			s.onTransitionStart(runCallbacks);
			var translateX = isH() ? translate: 0,
			translateY = isH() ? 0 : translate;
			if (speed === 0) {
				s.setWrapperTransition(0);
				s.setWrapperTranslate(translate);
				s.onTransitionEnd(runCallbacks)
			} else {
				s.setWrapperTransition(speed);
				s.setWrapperTranslate(translate);
				if (!s.animating) {
					s.animating = true;
					s.wrapper.transitionEnd(function() {
						s.onTransitionEnd(runCallbacks)
					})
				}
			}
			s.updateClasses();
			return true
		};
		s.onTransitionStart = function(runCallbacks) {
			if (typeof runCallbacks === 'undefined') runCallbacks = true;
			if (s.lazy) s.lazy.onTransitionStart();
			if (runCallbacks) {
				s.emit('onTransitionStart', s);
				if (s.activeIndex !== s.previousIndex) {
					s.emit('onSlideChangeStart', s)
				}
			}
		};
		s.onTransitionEnd = function(runCallbacks) {
			s.animating = false;
			s.setWrapperTransition(0);
			if (typeof runCallbacks === 'undefined') runCallbacks = true;
			if (s.lazy) s.lazy.onTransitionEnd();
			if (runCallbacks) {
				s.emit('onTransitionEnd', s);
				if (s.activeIndex !== s.previousIndex) {
					s.emit('onSlideChangeEnd', s)
				}
			}
			if (s.params.hashnav && s.hashnav) {
				s.hashnav.setHash()
			}
		};
		s.slideNext = function(runCallbacks, speed, internal) {
			if (s.params.loop) {
				if (s.animating) return false;
				s.fixLoop();
				var clientLeft = s.container[0].clientLeft;
				return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
			} else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal)
		};
		s._slideNext = function(speed) {
			return s.slideNext(true, speed, true)
		};
		s.slidePrev = function(runCallbacks, speed, internal) {
			if (s.params.loop) {
				if (s.animating) return false;
				s.fixLoop();
				var clientLeft = s.container[0].clientLeft;
				return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
			} else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal)
		};
		s._slidePrev = function(speed) {
			return s.slidePrev(true, speed, true)
		};
		s.slideReset = function(runCallbacks, speed, internal) {
			return s.slideTo(s.activeIndex, speed, runCallbacks)
		};
		s.setWrapperTransition = function(duration, byController) {
			s.wrapper.transition(duration);
			if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
				s.effects[s.params.effect].setTransition(duration)
			}
			if (s.params.parallax && s.parallax) {
				s.parallax.setTransition(duration)
			}
			if (s.params.scrollbar && s.scrollbar) {
				s.scrollbar.setTransition(duration)
			}
			if (s.params.control && s.controller) {
				s.controller.setTransition(duration, byController)
			}
			s.emit('onSetTransition', s, duration)
		};
		s.setWrapperTranslate = function(translate, updateActiveIndex, byController) {
			var x = 0,
			y = 0,
			z = 0;
			if (isH()) {
				x = s.rtl ? -translate: translate
			} else {
				y = translate
			}
			if (!s.params.virtualTranslate) {
				if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
				else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)')
			}
			s.translate = isH() ? x: y;
			if (updateActiveIndex) s.updateActiveIndex();
			if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
				s.effects[s.params.effect].setTranslate(s.translate)
			}
			if (s.params.parallax && s.parallax) {
				s.parallax.setTranslate(s.translate)
			}
			if (s.params.scrollbar && s.scrollbar) {
				s.scrollbar.setTranslate(s.translate)
			}
			if (s.params.control && s.controller) {
				s.controller.setTranslate(s.translate, byController)
			}
			s.emit('onSetTranslate', s, s.translate)
		};
		s.getTranslate = function(el, axis) {
			var matrix, curTransform, curStyle, transformMatrix;
			if (typeof axis === 'undefined') {
				axis = 'x'
			}
			if (s.params.virtualTranslate) {
				return s.rtl ? -s.translate: s.translate
			}
			curStyle = window.getComputedStyle(el, null);
			if (window.WebKitCSSMatrix) {
				transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '': curStyle.webkitTransform)
			} else {
				transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
				matrix = transformMatrix.toString().split(',')
			}
			if (axis === 'x') {
				if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
				else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
				else curTransform = parseFloat(matrix[4])
			}
			if (axis === 'y') {
				if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
				else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
				else curTransform = parseFloat(matrix[5])
			}
			if (s.rtl && curTransform) curTransform = -curTransform;
			return curTransform || 0
		};
		s.getWrapperTranslate = function(axis) {
			if (typeof axis === 'undefined') {
				axis = isH() ? 'x': 'y'
			}
			return s.getTranslate(s.wrapper[0], axis)
		};
		s.observers = [];
		function initObserver(target, options) {
			options = options || {};
			var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
			var observer = new ObserverFunc(function(mutations) {
				mutations.forEach(function(mutation) {
					s.onResize();
					s.emit('onObserverUpdate', s, mutation)
				})
			});
			observer.observe(target, {
				attributes: typeof options.attributes === 'undefined' ? true: options.attributes,
				childList: typeof options.childList === 'undefined' ? true: options.childList,
				characterData: typeof options.characterData === 'undefined' ? true: options.characterData
			});
			s.observers.push(observer)
		}
		s.initObservers = function() {
			if (s.params.observeParents) {
				var containerParents = s.container.parents();
				for (var i = 0; i < containerParents.length; i++) {
					initObserver(containerParents[i])
				}
			}
			initObserver(s.container[0], {
				childList: false
			});
			initObserver(s.wrapper[0], {
				attributes: false
			})
		};
		s.disconnectObservers = function() {
			for (var i = 0; i < s.observers.length; i++) {
				s.observers[i].disconnect()
			}
			s.observers = []
		};
		s.createLoop = function() {
			s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
			var slides = s.wrapper.children('.' + s.params.slideClass);
			s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
			s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
			if (s.loopedSlides > slides.length) {
				s.loopedSlides = slides.length
			}
			var prependSlides = [],
			appendSlides = [],
			i;
			slides.each(function(index, el) {
				var slide = $(this);
				if (index < s.loopedSlides) appendSlides.push(el);
				if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
				slide.attr('data-rbslider-slide-index', index)
			});
			for (i = 0; i < appendSlides.length; i++) {
				s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass))
			}
			for (i = prependSlides.length - 1; i >= 0; i--) {
				s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass))
			}
		};
		s.destroyLoop = function() {
			s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
			s.slides.removeAttr('data-rbslider-slide-index')
		};
		s.fixLoop = function() {
			var newIndex;
			if (s.activeIndex < s.loopedSlides) {
				newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
				newIndex = newIndex + s.loopedSlides;
				s.slideTo(newIndex, 0, false, true)
			} else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
				newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
				newIndex = newIndex + s.loopedSlides;
				s.slideTo(newIndex, 0, false, true)
			}
		};
		s.appendSlide = function(slides) {
			if (s.params.loop) {
				s.destroyLoop()
			}
			if (typeof slides === 'object' && slides.length) {
				for (var i = 0; i < slides.length; i++) {
					if (slides[i]) s.wrapper.append(slides[i])
				}
			} else {
				s.wrapper.append(slides)
			}
			if (s.params.loop) {
				s.createLoop()
			}
			if (! (s.params.observer && s.support.observer)) {
				s.update(true)
			}
		};
		s.prependSlide = function(slides) {
			if (s.params.loop) {
				s.destroyLoop()
			}
			var newActiveIndex = s.activeIndex + 1;
			if (typeof slides === 'object' && slides.length) {
				for (var i = 0; i < slides.length; i++) {
					if (slides[i]) s.wrapper.prepend(slides[i])
				}
				newActiveIndex = s.activeIndex + slides.length
			} else {
				s.wrapper.prepend(slides)
			}
			if (s.params.loop) {
				s.createLoop()
			}
			if (! (s.params.observer && s.support.observer)) {
				s.update(true)
			}
			s.slideTo(newActiveIndex, 0, false)
		};
		s.removeSlide = function(slidesIndexes) {
			if (s.params.loop) {
				s.destroyLoop()
			}
			var newActiveIndex = s.activeIndex,
			indexToRemove;
			if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
				for (var i = 0; i < slidesIndexes.length; i++) {
					indexToRemove = slidesIndexes[i];
					if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
					if (indexToRemove < newActiveIndex) newActiveIndex--
				}
				newActiveIndex = Math.max(newActiveIndex, 0)
			} else {
				indexToRemove = slidesIndexes;
				if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
				if (indexToRemove < newActiveIndex) newActiveIndex--;
				newActiveIndex = Math.max(newActiveIndex, 0)
			}
			if (! (s.params.observer && s.support.observer)) {
				s.update(true)
			}
			s.slideTo(newActiveIndex, 0, false)
		};
		s.removeAllSlides = function() {
			var slidesIndexes = [];
			for (var i = 0; i < s.slides.length; i++) {
				slidesIndexes.push(i)
			}
			s.removeSlide(slidesIndexes)
		};
		s.effects = {
			fade: {
				fadeIndex: null,
				setTranslate: function() {
					for (var i = 0; i < s.slides.length; i++) {
						var slide = s.slides.eq(i);
						var offset = slide[0].rbsliderSlideOffset;
						var tx = -offset;
						if (!s.params.virtualTranslate) tx = tx - s.translate;
						var ty = 0;
						if (!isH()) {
							ty = tx;
							tx = 0
						}
						var slideOpacity = s.params.fade.crossFade ? Math.max(1 - Math.abs(slide[0].progress), 0) : 1 + Math.min(Math.max(slide[0].progress, -1), 0);
						if (slideOpacity > 0 && slideOpacity < 1) {
							s.effects.fade.fadeIndex = i
						}
						slide.css({
							opacity: slideOpacity
						}).transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)')
					}
				},
				setTransition: function(duration) {
					s.slides.transition(duration);
					if (s.params.virtualTranslate && duration !== 0) {
						var fadeIndex = s.effects.fade.fadeIndex !== null ? s.effects.fade.fadeIndex: s.activeIndex;
						s.slides.eq(fadeIndex).transitionEnd(function() {
							var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
							for (var i = 0; i < triggerEvents.length; i++) {
								s.wrapper.trigger(triggerEvents[i])
							}
						})
					}
				}
			},
			cube: {
				setTranslate: function() {
					var wrapperRotate = 0,
					cubeShadow;
					if (s.params.cube.shadow) {
						if (isH()) {
							cubeShadow = s.wrapper.find('.rbslider-cube-shadow');
							if (cubeShadow.length === 0) {
								cubeShadow = $('<div class="rbslider-cube-shadow"></div>');
								s.wrapper.append(cubeShadow)
							}
							cubeShadow.css({
								height: s.width + 'px'
							})
						} else {
							cubeShadow = s.container.find('.rbslider-cube-shadow');
							if (cubeShadow.length === 0) {
								cubeShadow = $('<div class="rbslider-cube-shadow"></div>');
								s.container.append(cubeShadow)
							}
						}
					}
					for (var i = 0; i < s.slides.length; i++) {
						var slide = s.slides.eq(i);
						var slideAngle = i * 90;
						var round = Math.floor(slideAngle / 360);
						if (s.rtl) {
							slideAngle = -slideAngle;
							round = Math.floor( - slideAngle / 360)
						}
						var progress = Math.max(Math.min(slide[0].progress, 1), -1);
						var tx = 0,
						ty = 0,
						tz = 0;
						if (i % 4 === 0) {
							tx = -round * 4 * s.size;
							tz = 0
						} else if ((i - 1) % 4 === 0) {
							tx = 0;
							tz = -round * 4 * s.size
						} else if ((i - 2) % 4 === 0) {
							tx = s.size + round * 4 * s.size;
							tz = s.size
						} else if ((i - 3) % 4 === 0) {
							tx = -s.size;
							tz = 3 * s.size + s.size * 4 * round
						}
						if (s.rtl) {
							tx = -tx
						}
						if (!isH()) {
							ty = tx;
							tx = 0
						}
						var transform = 'rotateX(' + (isH() ? 0 : -slideAngle) + 'deg) rotateY(' + (isH() ? slideAngle: 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
						if (progress <= 1 && progress > -1) {
							wrapperRotate = i * 90 + progress * 90;
							if (s.rtl) wrapperRotate = -i * 90 - progress * 90
						}
						slide.transform(transform);
						if (s.params.cube.slideShadows) {
							var shadowBefore = isH() ? slide.find('.rbslider-slide-shadow-left') : slide.find('.rbslider-slide-shadow-top');
							var shadowAfter = isH() ? slide.find('.rbslider-slide-shadow-right') : slide.find('.rbslider-slide-shadow-bottom');
							if (shadowBefore.length === 0) {
								shadowBefore = $('<div class="rbslider-slide-shadow-' + (isH() ? 'left': 'top') + '"></div>');
								slide.append(shadowBefore)
							}
							if (shadowAfter.length === 0) {
								shadowAfter = $('<div class="rbslider-slide-shadow-' + (isH() ? 'right': 'bottom') + '"></div>');
								slide.append(shadowAfter)
							}
							var shadowOpacity = slide[0].progress;
							if (shadowBefore.length) shadowBefore[0].style.opacity = -slide[0].progress;
							if (shadowAfter.length) shadowAfter[0].style.opacity = slide[0].progress
						}
					}
					s.wrapper.css({
						'-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
						'-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
						'-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
						'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
					});
					if (s.params.cube.shadow) {
						if (isH()) {
							cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + ( - s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')')
						} else {
							var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
							var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
							var scale1 = s.params.cube.shadowScale,
							scale2 = s.params.cube.shadowScale / multiplier,
							offset = s.params.cube.shadowOffset;
							cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + ( - s.height / 2 / scale2) + 'px) rotateX(-90deg)')
						}
					}
					var zFactor = (s.isSafari || s.isUiWebView) ? ( - s.size / 2) : 0;
					s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (isH() ? 0 : wrapperRotate) + 'deg) rotateY(' + (isH() ? -wrapperRotate: 0) + 'deg)')
				},
				setTransition: function(duration) {
					s.slides.transition(duration).find('.rbslider-slide-shadow-top, .rbslider-slide-shadow-right, .rbslider-slide-shadow-bottom, .rbslider-slide-shadow-left').transition(duration);
					if (s.params.cube.shadow && !isH()) {
						s.container.find('.rbslider-cube-shadow').transition(duration)
					}
				}
			},
			coverflow: {
				setTranslate: function() {
					var transform = s.translate;
					var center = isH() ? -transform + s.width / 2 : -transform + s.height / 2;
					var rotate = isH() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
					var translate = s.params.coverflow.depth;
					for (var i = 0,
					length = s.slides.length; i < length; i++) {
						var slide = s.slides.eq(i);
						var slideSize = s.slidesSizesGrid[i];
						var slideOffset = slide[0].rbsliderSlideOffset;
						var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
						var rotateY = isH() ? rotate * offsetMultiplier: 0;
						var rotateX = isH() ? 0 : rotate * offsetMultiplier;
						var translateZ = -translate * Math.abs(offsetMultiplier);
						var translateY = isH() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
						var translateX = isH() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
						if (Math.abs(translateX) < 0.001) translateX = 0;
						if (Math.abs(translateY) < 0.001) translateY = 0;
						if (Math.abs(translateZ) < 0.001) translateZ = 0;
						if (Math.abs(rotateY) < 0.001) rotateY = 0;
						if (Math.abs(rotateX) < 0.001) rotateX = 0;
						var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
						slide.transform(slideTransform);
						slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
						if (s.params.coverflow.slideShadows) {
							var shadowBefore = isH() ? slide.find('.rbslider-slide-shadow-left') : slide.find('.rbslider-slide-shadow-top');
							var shadowAfter = isH() ? slide.find('.rbslider-slide-shadow-right') : slide.find('.rbslider-slide-shadow-bottom');
							if (shadowBefore.length === 0) {
								shadowBefore = $('<div class="rbslider-slide-shadow-' + (isH() ? 'left': 'top') + '"></div>');
								slide.append(shadowBefore)
							}
							if (shadowAfter.length === 0) {
								shadowAfter = $('<div class="rbslider-slide-shadow-' + (isH() ? 'right': 'bottom') + '"></div>');
								slide.append(shadowAfter)
							}
							if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier: 0;
							if (shadowAfter.length) shadowAfter[0].style.opacity = ( - offsetMultiplier) > 0 ? -offsetMultiplier: 0
						}
					}
					if (s.browser.ie) {
						var ws = s.wrapper[0].style;
						ws.perspectiveOrigin = center + 'px 50%'
					}
				},
				setTransition: function(duration) {
					s.slides.transition(duration).find('.rbslider-slide-shadow-top, .rbslider-slide-shadow-right, .rbslider-slide-shadow-bottom, .rbslider-slide-shadow-left').transition(duration)
				}
			}
		};
		s.lazy = {
			initialImageLoaded: false,
			loadImageInSlide: function(index) {
				if (typeof index === 'undefined') return;
				if (s.slides.length === 0) return;
				var slide = s.slides.eq(index);
				var img = slide.find('img.rbslider-lazy:not(.rbslider-lazy-loaded):not(.rbslider-lazy-loading)');
				if (img.length === 0) return;
				img.each(function() {
					var _img = $(this);
					_img.addClass('rbslider-lazy-loading');
					var src = _img.attr('data-src');
					s.loadImage(_img[0], src, false,
					function() {
						_img.attr('src', src);
						_img.removeAttr('data-src');
						_img.addClass('rbslider-lazy-loaded').removeClass('rbslider-lazy-loading');
						slide.find('.rbslider-lazy-preloader, .preloader').remove();
						s.emit('onLazyImageReady', s, slide[0], _img[0])
					});
					s.emit('onLazyImageLoad', s, slide[0], _img[0])
				})
			},
			load: function() {
				if (s.params.watchSlidesVisibility) {
					s.wrapper.children('.' + s.params.slideVisibleClass).each(function() {
						s.lazy.loadImageInSlide($(this).index())
					})
				} else {
					if (s.params.slidesPerView > 1) {
						for (var i = s.activeIndex; i < s.activeIndex + s.params.slidesPerView; i++) {
							if (s.slides[i]) s.lazy.loadImageInSlide(i)
						}
					} else {
						s.lazy.loadImageInSlide(s.activeIndex)
					}
				}
				if (s.params.lazyLoadingInPrevNext) {
					var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
					if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
					var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
					if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index())
				}
			},
			onTransitionStart: function() {
				if (s.params.lazyLoading) {
					if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
						s.lazy.initialImageLoaded = true;
						s.lazy.load()
					}
				}
			},
			onTransitionEnd: function() {
				if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
					s.lazy.load()
				}
			}
		};
		s.scrollbar = {
			set: function() {
				if (!s.params.scrollbar) return;
				var sb = s.scrollbar;
				sb.track = $(s.params.scrollbar);
				sb.drag = sb.track.find('.rbslider-scrollbar-drag');
				if (sb.drag.length === 0) {
					sb.drag = $('<div class="rbslider-scrollbar-drag"></div>');
					sb.track.append(sb.drag)
				}
				sb.drag[0].style.width = '';
				sb.drag[0].style.height = '';
				sb.trackSize = isH() ? sb.track[0].offsetWidth: sb.track[0].offsetHeight;
				sb.divider = s.size / s.virtualSize;
				sb.moveDivider = sb.divider * (sb.trackSize / s.size);
				sb.dragSize = sb.trackSize * sb.divider;
				if (isH()) {
					sb.drag[0].style.width = sb.dragSize + 'px'
				} else {
					sb.drag[0].style.height = sb.dragSize + 'px'
				}
				if (sb.divider >= 1) {
					sb.track[0].style.display = 'none'
				} else {
					sb.track[0].style.display = ''
				}
				if (s.params.scrollbarHide) {
					sb.track[0].style.opacity = 0
				}
			},
			setTranslate: function() {
				if (!s.params.scrollbar) return;
				var diff;
				var sb = s.scrollbar;
				var translate = s.translate || 0;
				var newPos;
				var newSize = sb.dragSize;
				newPos = (sb.trackSize - sb.dragSize) * s.progress;
				if (s.rtl && isH()) {
					newPos = -newPos;
					if (newPos > 0) {
						newSize = sb.dragSize - newPos;
						newPos = 0
					} else if ( - newPos + sb.dragSize > sb.trackSize) {
						newSize = sb.trackSize + newPos
					}
				} else {
					if (newPos < 0) {
						newSize = sb.dragSize + newPos;
						newPos = 0
					} else if (newPos + sb.dragSize > sb.trackSize) {
						newSize = sb.trackSize - newPos
					}
				}
				if (isH()) {
					if (s.support.transforms3d) {
						sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)')
					} else {
						sb.drag.transform('translateX(' + (newPos) + 'px)')
					}
					sb.drag[0].style.width = newSize + 'px'
				} else {
					if (s.support.transforms3d) {
						sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)')
					} else {
						sb.drag.transform('translateY(' + (newPos) + 'px)')
					}
					sb.drag[0].style.height = newSize + 'px'
				}
				if (s.params.scrollbarHide) {
					clearTimeout(sb.timeout);
					sb.track[0].style.opacity = 1;
					sb.timeout = setTimeout(function() {
						sb.track[0].style.opacity = 0;
						sb.track.transition(400)
					},
					1000)
				}
			},
			setTransition: function(duration) {
				if (!s.params.scrollbar) return;
				s.scrollbar.drag.transition(duration)
			}
		};
		s.controller = {
			setTranslate: function(translate, byController) {
				var controlled = s.params.control;
				var multiplier, controlledTranslate;
				if (s.isArray(controlled)) {
					for (var i = 0; i < controlled.length; i++) {
						if (controlled[i] !== byController && controlled[i] instanceof Rbslider) {
							translate = controlled[i].rtl && controlled[i].params.direction === 'horizontal' ? -s.translate: s.translate;
							multiplier = (controlled[i].maxTranslate() - controlled[i].minTranslate()) / (s.maxTranslate() - s.minTranslate());
							controlledTranslate = (translate - s.minTranslate()) * multiplier + controlled[i].minTranslate();
							if (s.params.controlInverse) {
								controlledTranslate = controlled[i].maxTranslate() - controlledTranslate
							}
							controlled[i].updateProgress(controlledTranslate);
							controlled[i].setWrapperTranslate(controlledTranslate, false, s);
							controlled[i].updateActiveIndex()
						}
					}
				} else if (controlled instanceof Rbslider && byController !== controlled) {
					translate = controlled.rtl && controlled.params.direction === 'horizontal' ? -s.translate: s.translate;
					multiplier = (controlled.maxTranslate() - controlled.minTranslate()) / (s.maxTranslate() - s.minTranslate());
					controlledTranslate = (translate - s.minTranslate()) * multiplier + controlled.minTranslate();
					if (s.params.controlInverse) {
						controlledTranslate = controlled.maxTranslate() - controlledTranslate
					}
					controlled.updateProgress(controlledTranslate);
					controlled.setWrapperTranslate(controlledTranslate, false, s);
					controlled.updateActiveIndex()
				}
			},
			setTransition: function(duration, byController) {
				var controlled = s.params.control;
				if (s.isArray(controlled)) {
					for (var i = 0; i < controlled.length; i++) {
						if (controlled[i] !== byController && controlled[i] instanceof Rbslider) {
							controlled[i].setWrapperTransition(duration, s)
						}
					}
				} else if (controlled instanceof Rbslider && byController !== controlled) {
					controlled.setWrapperTransition(duration, s)
				}
			}
		};
		s.hashnav = {
			init: function() {
				if (!s.params.hashnav) return;
				s.hashnav.initialized = true;
				var hash = document.location.hash.replace('#', '');
				if (!hash) return;
				var speed = 0;
				for (var i = 0,
				length = s.slides.length; i < length; i++) {
					var slide = s.slides.eq(i);
					var slideHash = slide.attr('data-hash');
					if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
						var index = slide.index();
						s.slideTo(index, speed, s.params.runCallbacksOnInit, true)
					}
				}
			},
			setHash: function() {
				if (!s.hashnav.initialized || !s.params.hashnav) return;
				document.location.hash = s.slides.eq(s.activeIndex).attr('data-hash') || ''
			}
		};
		function handleKeyboard(e) {
			if (e.originalEvent) e = e.originalEvent;
			var kc = e.keyCode || e.charCode;
			if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
				return
			}
			if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
				return
			}
			if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
				var inView = false;
				if (s.container.parents('.rbslider-slide').length > 0 && s.container.parents('.rbslider-slide-active').length === 0) {
					return
				}
				var windowScroll = {
					left: window.pageXOffset,
					top: window.pageYOffset
				};
				var windowWidth = window.innerWidth;
				var windowHeight = window.innerHeight;
				var rbsliderOffset = s.container.offset();
				var rbsliderCoord = [[rbsliderOffset.left, rbsliderOffset.top], [rbsliderOffset.left + s.width, rbsliderOffset.top], [rbsliderOffset.left, rbsliderOffset.top + s.height], [rbsliderOffset.left + s.width, rbsliderOffset.top + s.height]];
				for (var i = 0; i < rbsliderCoord.length; i++) {
					var point = rbsliderCoord[i];
					if (point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth && point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight) {
						inView = true
					}
				}
				if (!inView) return
			}
			if (isH()) {
				if (kc === 37 || kc === 39) {
					if (e.preventDefault) e.preventDefault();
					else e.returnValue = false
				}
				if (kc === 39) s.slideNext();
				if (kc === 37) s.slidePrev()
			} else {
				if (kc === 38 || kc === 40) {
					if (e.preventDefault) e.preventDefault();
					else e.returnValue = false
				}
				if (kc === 40) s.slideNext();
				if (kc === 38) s.slidePrev()
			}
		}
		s.disableKeyboardControl = function() {
			$(document).off('keydown', handleKeyboard)
		};
		s.enableKeyboardControl = function() {
			$(document).on('keydown', handleKeyboard)
		};
		s._wheelEvent = false;
		s._lastWheelScrollTime = (new Date()).getTime();
		if (s.params.mousewheelControl) {
			if (document.onmousewheel !== undefined) {
				s._wheelEvent = 'mousewheel'
			}
			if (!s._wheelEvent) {
				try {
					new WheelEvent('wheel');
					s._wheelEvent = 'wheel'
				} catch(e) {}
			}
			if (!s._wheelEvent) {
				s._wheelEvent = 'DOMMouseScroll'
			}
		}
		function handleMousewheel(e) {
			if (e.originalEvent) e = e.originalEvent;
			var we = s._wheelEvent;
			var delta = 0;
			if (e.detail) delta = -e.detail;
			else if (we === 'mousewheel') {
				if (s.params.mousewheelForceToAxis) {
					if (isH()) {
						if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
						else return
					} else {
						if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
						else return
					}
				} else {
					delta = e.wheelDelta
				}
			} else if (we === 'DOMMouseScroll') delta = -e.detail;
			else if (we === 'wheel') {
				if (s.params.mousewheelForceToAxis) {
					if (isH()) {
						if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
						else return
					} else {
						if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
						else return
					}
				} else {
					delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? -e.deltaX: -e.deltaY
				}
			}
			if (!s.params.freeMode) {
				if ((new Date()).getTime() - s._lastWheelScrollTime > 60) {
					if (delta < 0) s.slideNext();
					else s.slidePrev()
				}
				s._lastWheelScrollTime = (new Date()).getTime()
			} else {
				var position = s.getWrapperTranslate() + delta;
				if (position > 0) position = 0;
				if (position < s.maxTranslate()) position = s.maxTranslate();
				s.setWrapperTransition(0);
				s.setWrapperTranslate(position);
				s.updateProgress();
				s.updateActiveIndex();
				if (position === 0 || position === s.maxTranslate()) return
			}
			if (s.params.autoplay) s.stopAutoplay();
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			return false
		}
		s.disableMousewheelControl = function() {
			if (!s._wheelEvent) return false;
			s.container.off(s._wheelEvent, handleMousewheel);
			return true
		};
		s.enableMousewheelControl = function() {
			if (!s._wheelEvent) return false;
			s.container.on(s._wheelEvent, handleMousewheel);
			return true
		};
		function setParallaxTransform(el, progress) {
			el = $(el);
			var p, pX, pY;
			p = el.attr('data-rbslider-parallax') || '0';
			pX = el.attr('data-rbslider-parallax-x');
			pY = el.attr('data-rbslider-parallax-y');
			if (pX || pY) {
				pX = pX || '0';
				pY = pY || '0'
			} else {
				if (isH()) {
					pX = p;
					pY = '0'
				} else {
					pY = p;
					pX = '0'
				}
			}
			if ((pX).indexOf('%') >= 0) {
				pX = parseInt(pX, 10) * progress + '%'
			} else {
				pX = pX * progress + 'px'
			}
			if ((pY).indexOf('%') >= 0) {
				pY = parseInt(pY, 10) * progress + '%'
			} else {
				pY = pY * progress + 'px'
			}
			el.transform('translate3d(' + pX + ', ' + pY + ',0px)')
		}
		s.parallax = {
			setTranslate: function() {
				s.container.children('[data-rbslider-parallax], [data-rbslider-parallax-x], [data-rbslider-parallax-y]').each(function() {
					setParallaxTransform(this, s.progress)
				});
				s.slides.each(function() {
					var slide = $(this);
					slide.find('[data-rbslider-parallax], [data-rbslider-parallax-x], [data-rbslider-parallax-y]').each(function() {
						var progress = Math.min(Math.max(slide[0].progress, -1), 1);
						setParallaxTransform(this, progress)
					})
				})
			},
			setTransition: function(duration) {
				if (typeof duration === 'undefined') duration = s.params.speed;
				s.container.find('[data-rbslider-parallax], [data-rbslider-parallax-x], [data-rbslider-parallax-y]').each(function() {
					var el = $(this);
					var parallaxDuration = parseInt(el.attr('data-rbslider-parallax-duration'), 10) || duration;
					if (duration === 0) parallaxDuration = 0;
					el.transition(parallaxDuration)
				})
			}
		};
		s._plugins = [];
		for (var plugin in s.plugins) {
			var p = s.plugins[plugin](s, s.params[plugin]);
			if (p) s._plugins.push(p)
		}
		s.callPlugins = function(eventName) {
			for (var i = 0; i < s._plugins.length; i++) {
				if (eventName in s._plugins[i]) {
					s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
				}
			}
		};
		function normalizeEventName(eventName) {
			if (eventName.indexOf('on') !== 0) {
				if (eventName[0] !== eventName[0].toUpperCase()) {
					eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1)
				} else {
					eventName = 'on' + eventName
				}
			}
			return eventName
		}
		s.emitterEventListeners = {};
		s.emit = function(eventName) {
			if (s.params[eventName]) {
				s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
			}
			var i;
			if (s.emitterEventListeners[eventName]) {
				for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
					s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
				}
			}
			if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
		};
		s.on = function(eventName, handler) {
			eventName = normalizeEventName(eventName);
			if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
			s.emitterEventListeners[eventName].push(handler);
			return s
		};
		s.off = function(eventName, handler) {
			var i;
			eventName = normalizeEventName(eventName);
			if (typeof handler === 'undefined') {
				s.emitterEventListeners[eventName] = [];
				return s
			}
			if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
			for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
				if (s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1)
			}
			return s
		};
		s.once = function(eventName, handler) {
			eventName = normalizeEventName(eventName);
			var _handler = function() {
				handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
				s.off(eventName, _handler)
			};
			s.on(eventName, _handler);
			return s
		};
		s.a11y = {
			makeFocusable: function($el) {
				$el[0].tabIndex = '0';
				return $el
			},
			addRole: function($el, role) {
				$el.attr('role', role);
				return $el
			},
			addLabel: function($el, label) {
				$el.attr('aria-label', label);
				return $el
			},
			disable: function($el) {
				$el.attr('aria-disabled', true);
				return $el
			},
			enable: function($el) {
				$el.attr('aria-disabled', false);
				return $el
			},
			onEnterKey: function(event) {
				if (event.keyCode !== 13) return;
				if ($(event.target).is(s.params.nextButton)) {
					s.onClickNext(event);
					if (s.isEnd) {
						s.a11y.notify(s.params.lastSlideMsg)
					} else {
						s.a11y.notify(s.params.nextSlideMsg)
					}
				} else if ($(event.target).is(s.params.prevButton)) {
					s.onClickPrev(event);
					if (s.isBeginning) {
						s.a11y.notify(s.params.firstSlideMsg)
					} else {
						s.a11y.notify(s.params.prevSlideMsg)
					}
				}
			},
			liveRegion: $('<span class="rbslider-notification" aria-live="assertive" aria-atomic="true"></span>'),
			notify: function(message) {
				var notification = s.a11y.liveRegion;
				if (notification.length === 0) return;
				notification.html('');
				notification.html(message)
			},
			init: function() {
				if (s.params.nextButton) {
					var nextButton = $(s.params.nextButton);
					s.a11y.makeFocusable(nextButton);
					s.a11y.addRole(nextButton, 'button');
					s.a11y.addLabel(nextButton, s.params.nextSlideMsg)
				}
				if (s.params.prevButton) {
					var prevButton = $(s.params.prevButton);
					s.a11y.makeFocusable(prevButton);
					s.a11y.addRole(prevButton, 'button');
					s.a11y.addLabel(prevButton, s.params.prevSlideMsg)
				}
				$(s.container).append(s.a11y.liveRegion)
			},
			destroy: function() {
				if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove()
			}
		};
		s.init = function() {
			if (s.params.loop) s.createLoop();
			s.updateContainerSize();
			s.updateSlidesSize();
			s.updatePagination();
			if (s.params.scrollbar && s.scrollbar) {
				s.scrollbar.set()
			}
			if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
				if (!s.params.loop) s.updateProgress();
				s.effects[s.params.effect].setTranslate()
			}
			if (s.params.loop) {
				s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit)
			} else {
				s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
				if (s.params.initialSlide === 0) {
					if (s.parallax && s.params.parallax) s.parallax.setTranslate();
					if (s.lazy && s.params.lazyLoading) s.lazy.load()
				}
			}
			s.attachEvents();
			if (s.params.observer && s.support.observer) {
				s.initObservers()
			}
			if (s.params.preloadImages && !s.params.lazyLoading) {
				s.preloadImages()
			}
			if (s.params.autoplay) {
				s.startAutoplay()
			}
			if (s.params.keyboardControl) {
				if (s.enableKeyboardControl) s.enableKeyboardControl()
			}
			if (s.params.mousewheelControl) {
				if (s.enableMousewheelControl) s.enableMousewheelControl()
			}
			if (s.params.hashnav) {
				if (s.hashnav) s.hashnav.init()
			}
			if (s.params.a11y && s.a11y) s.a11y.init();
			s.emit('onInit', s)
		};
		s.cleanupStyles = function() {
			s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
			s.wrapper.removeAttr('style');
			if (s.slides && s.slides.length) {
				s.slides.removeClass([s.params.slideVisibleClass, s.params.slideActiveClass, s.params.slideNextClass, s.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-rbslider-column').removeAttr('data-rbslider-row')
			}
			if (s.paginationContainer && s.paginationContainer.length) {
				s.paginationContainer.removeClass(s.params.paginationHiddenClass)
			}
			if (s.bullets && s.bullets.length) {
				s.bullets.removeClass(s.params.bulletActiveClass)
			}
			if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
			if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
			if (s.params.scrollbar && s.scrollbar) {
				if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
				if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style')
			}
		};
		s.destroy = function(deleteInstance, cleanupStyles) {
			s.detachEvents();
			s.stopAutoplay();
			if (s.params.loop) {
				s.destroyLoop()
			}
			if (cleanupStyles) {
				s.cleanupStyles()
			}
			s.disconnectObservers();
			if (s.params.keyboardControl) {
				if (s.disableKeyboardControl) s.disableKeyboardControl()
			}
			if (s.params.mousewheelControl) {
				if (s.disableMousewheelControl) s.disableMousewheelControl()
			}
			if (s.params.a11y && s.a11y) s.a11y.destroy();
			s.emit('onDestroy');
			if (deleteInstance !== false) s = null
		};
		s.init();
		return s
	};
	Rbslider.prototype = {
		isSafari: (function() {
			var ua = navigator.userAgent.toLowerCase();
			return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0)
		})(),
		isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
		isArray: function(arr) {
			return Object.prototype.toString.apply(arr) === '[object Array]'
		},
		browser: {
			ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
			ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
		},
		device: (function() {
			var ua = navigator.userAgent;
			var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
			var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
			var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
			var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
			return {
				ios: ipad || iphone || ipad,
				android: android
			}
		})(),
		support: {
			touch: (window.Modernizr && Modernizr.touch === true) || (function() {
				return !! (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
			})(),
			transforms3d: (window.Modernizr && Modernizr.csstransforms3d === true) || (function() {
				var div = document.createElement('div').style;
				return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div)
			})(),
			flexbox: (function() {
				var div = document.createElement('div').style;
				var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
				for (var i = 0; i < styles.length; i++) {
					if (styles[i] in div) return true
				}
			})(),
			observer: (function() {
				return ('MutationObserver' in window || 'WebkitMutationObserver' in window)
			})()
		},
		plugins: {}
	};
	var Dom7 = (function() {
		var Dom7 = function(arr) {
			var _this = this,
			i = 0;
			for (i = 0; i < arr.length; i++) {
				_this[i] = arr[i]
			}
			_this.length = arr.length;
			return this
		};
		var $ = function(selector, context) {
			var arr = [],
			i = 0;
			if (selector && !context) {
				if (selector instanceof Dom7) {
					return selector
				}
			}
			if (selector) {
				if (typeof selector === 'string') {
					var els, tempParent, html = selector.trim();
					if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
						var toCreate = 'div';
						if (html.indexOf('<li') === 0) toCreate = 'ul';
						if (html.indexOf('<tr') === 0) toCreate = 'tbody';
						if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
						if (html.indexOf('<tbody') === 0) toCreate = 'table';
						if (html.indexOf('<option') === 0) toCreate = 'select';
						tempParent = document.createElement(toCreate);
						tempParent.innerHTML = selector;
						for (i = 0; i < tempParent.childNodes.length; i++) {
							arr.push(tempParent.childNodes[i])
						}
					} else {
						if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
							els = [document.getElementById(selector.split('#')[1])]
						} else {
							els = (context || document).querySelectorAll(selector)
						}
						for (i = 0; i < els.length; i++) {
							if (els[i]) arr.push(els[i])
						}
					}
				} else if (selector.nodeType || selector === window || selector === document) {
					arr.push(selector)
				} else if (selector.length > 0 && selector[0].nodeType) {
					for (i = 0; i < selector.length; i++) {
						arr.push(selector[i])
					}
				}
			}
			return new Dom7(arr)
		};
		Dom7.prototype = {
			addClass: function(className) {
				if (typeof className === 'undefined') {
					return this
				}
				var classes = className.split(' ');
				for (var i = 0; i < classes.length; i++) {
					for (var j = 0; j < this.length; j++) {
						jQuery(this[j]).addClass(classes[i])
					}
				}
				return this
			},
			removeClass: function(className) {
				var classes = className.split(' ');
				for (var i = 0; i < classes.length; i++) {
					for (var j = 0; j < this.length; j++) {
						jQuery(this[j]).removeClass(classes[i])
					}
				}
				return this
			},
			hasClass: function(className) {
				if (!this[0]) return false;
				else return this[0].classList.contains(className)
			},
			toggleClass: function(className) {
				var classes = className.split(' ');
				for (var i = 0; i < classes.length; i++) {
					for (var j = 0; j < this.length; j++) {
						jQuery(this[j]).toggleClass(classes[i])
					}
				}
				return this
			},
			attr: function(attrs, value) {
				if (arguments.length === 1 && typeof attrs === 'string') {
					if (this[0]) return this[0].getAttribute(attrs);
					else return undefined
				} else {
					for (var i = 0; i < this.length; i++) {
						if (arguments.length === 2) {
							this[i].setAttribute(attrs, value)
						} else {
							for (var attrName in attrs) {
								this[i][attrName] = attrs[attrName];
								this[i].setAttribute(attrName, attrs[attrName])
							}
						}
					}
					return this
				}
			},
			removeAttr: function(attr) {
				for (var i = 0; i < this.length; i++) {
					this[i].removeAttribute(attr)
				}
				return this
			},
			data: function(key, value) {
				if (typeof value === 'undefined') {
					if (this[0]) {
						var dataKey = this[0].getAttribute('data-' + key);
						if (dataKey) return dataKey;
						else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
						else return undefined
					} else return undefined
				} else {
					for (var i = 0; i < this.length; i++) {
						var el = this[i];
						if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
						el.dom7ElementDataStorage[key] = value
					}
					return this
				}
			},
			transform: function(transform) {
				for (var i = 0; i < this.length; i++) {
					var elStyle = this[i].style;
					elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
				}
				return this
			},
			transition: function(duration) {
				if (typeof duration !== 'string') {
					duration = duration + 'ms'
				}
				for (var i = 0; i < this.length; i++) {
					var elStyle = this[i].style;
					elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
				}
				return this
			},
			on: function(eventName, targetSelector, listener, capture) {
				function handleLiveEvent(e) {
					var target = e.target;
					if ($(target).is(targetSelector)) listener.call(target, e);
					else {
						var parents = $(target).parents();
						for (var k = 0; k < parents.length; k++) {
							if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e)
						}
					}
				}
				var events = eventName.split(' ');
				var i, j;
				for (i = 0; i < this.length; i++) {
					if (typeof targetSelector === 'function' || targetSelector === false) {
						if (typeof targetSelector === 'function') {
							listener = arguments[1];
							capture = arguments[2] || false
						}
						for (j = 0; j < events.length; j++) {
							this[i].addEventListener(events[j], listener, capture)
						}
					} else {
						for (j = 0; j < events.length; j++) {
							if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
							this[i].dom7LiveListeners.push({
								listener: listener,
								liveListener: handleLiveEvent
							});
							this[i].addEventListener(events[j], handleLiveEvent, capture)
						}
					}
				}
				return this
			},
			off: function(eventName, targetSelector, listener, capture) {
				var events = eventName.split(' ');
				for (var i = 0; i < events.length; i++) {
					for (var j = 0; j < this.length; j++) {
						if (typeof targetSelector === 'function' || targetSelector === false) {
							if (typeof targetSelector === 'function') {
								listener = arguments[1];
								capture = arguments[2] || false
							}
							this[j].removeEventListener(events[i], listener, capture)
						} else {
							if (this[j].dom7LiveListeners) {
								for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
									if (this[j].dom7LiveListeners[k].listener === listener) {
										this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture)
									}
								}
							}
						}
					}
				}
				return this
			},
			once: function(eventName, targetSelector, listener, capture) {
				var dom = this;
				if (typeof targetSelector === 'function') {
					targetSelector = false;
					listener = arguments[1];
					capture = arguments[2]
				}
				function proxy(e) {
					listener(e);
					dom.off(eventName, targetSelector, proxy, capture)
				}
				dom.on(eventName, targetSelector, proxy, capture)
			},
			trigger: function(eventName, eventData) {
				for (var i = 0; i < this.length; i++) {
					var evt;
					try {
						evt = new CustomEvent(eventName, {
							detail: eventData,
							bubbles: true,
							cancelable: true
						})
					} catch(e) {
						evt = document.createEvent('Event');
						evt.initEvent(eventName, true, true);
						evt.detail = eventData
					}
					this[i].dispatchEvent(evt)
				}
				return this
			},
			transitionEnd: function(callback) {
				var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
				i,
				j,
				dom = this;
				function fireCallBack(e) {
					if (e.target !== this) return;
					callback.call(this, e);
					for (i = 0; i < events.length; i++) {
						dom.off(events[i], fireCallBack)
					}
				}
				if (callback) {
					for (i = 0; i < events.length; i++) {
						dom.on(events[i], fireCallBack)
					}
				}
				return this
			},
			width: function() {
				if (this[0] === window) {
					return window.innerWidth
				} else {
					if (this.length > 0) {
						return parseFloat(this.css('width'))
					} else {
						return null
					}
				}
			},
			outerWidth: function(includeMargins) {
				if (this.length > 0) {
					if (includeMargins) return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
					else return this[0].offsetWidth
				} else return null
			},
			height: function() {
				if (this[0] === window) {
					return window.innerHeight
				} else {
					if (this.length > 0) {
						return parseFloat(this.css('height'))
					} else {
						return null
					}
				}
			},
			outerHeight: function(includeMargins) {
				if (this.length > 0) {
					if (includeMargins) return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
					else return this[0].offsetHeight
				} else return null
			},
			offset: function() {
				if (this.length > 0) {
					var el = this[0];
					var box = el.getBoundingClientRect();
					var body = document.body;
					var clientTop = el.clientTop || body.clientTop || 0;
					var clientLeft = el.clientLeft || body.clientLeft || 0;
					var scrollTop = window.pageYOffset || el.scrollTop;
					var scrollLeft = window.pageXOffset || el.scrollLeft;
					return {
						top: box.top + scrollTop - clientTop,
						left: box.left + scrollLeft - clientLeft
					}
				} else {
					return null
				}
			},
			css: function(props, value) {
				var i;
				if (arguments.length === 1) {
					if (typeof props === 'string') {
						if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props)
					} else {
						for (i = 0; i < this.length; i++) {
							for (var prop in props) {
								this[i].style[prop] = props[prop]
							}
						}
						return this
					}
				}
				if (arguments.length === 2 && typeof props === 'string') {
					for (i = 0; i < this.length; i++) {
						this[i].style[props] = value
					}
					return this
				}
				return this
			},
			each: function(callback) {
				for (var i = 0; i < this.length; i++) {
					callback.call(this[i], i, this[i])
				}
				return this
			},
			html: function(html) {
				if (typeof html === 'undefined') {
					return this[0] ? this[0].innerHTML: undefined
				} else {
					for (var i = 0; i < this.length; i++) {
						this[i].innerHTML = html
					}
					return this
				}
			},
			is: function(selector) {
				if (!this[0]) return false;
				var compareWith, i;
				if (typeof selector === 'string') {
					var el = this[0];
					if (el === document) return selector === document;
					if (el === window) return selector === window;
					if (el.matches) return el.matches(selector);
					else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
					else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
					else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
					else {
						compareWith = $(selector);
						for (i = 0; i < compareWith.length; i++) {
							if (compareWith[i] === this[0]) return true
						}
						return false
					}
				} else if (selector === document) return this[0] === document;
				else if (selector === window) return this[0] === window;
				else {
					if (selector.nodeType || selector instanceof Dom7) {
						compareWith = selector.nodeType ? [selector] : selector;
						for (i = 0; i < compareWith.length; i++) {
							if (compareWith[i] === this[0]) return true
						}
						return false
					}
					return false
				}
			},
			index: function() {
				if (this[0]) {
					var child = this[0];
					var i = 0;
					while ((child = child.previousSibling) !== null) {
						if (child.nodeType === 1) i++
					}
					return i
				} else return undefined
			},
			eq: function(index) {
				if (typeof index === 'undefined') return this;
				var length = this.length;
				var returnIndex;
				if (index > length - 1) {
					return new Dom7([])
				}
				if (index < 0) {
					returnIndex = length + index;
					if (returnIndex < 0) return new Dom7([]);
					else return new Dom7([this[returnIndex]])
				}
				return new Dom7([this[index]])
			},
			append: function(newChild) {
				var i, j;
				for (i = 0; i < this.length; i++) {
					if (typeof newChild === 'string') {
						var tempDiv = document.createElement('div');
						tempDiv.innerHTML = newChild;
						while (tempDiv.firstChild) {
							this[i].appendChild(tempDiv.firstChild)
						}
					} else if (newChild instanceof Dom7) {
						for (j = 0; j < newChild.length; j++) {
							this[i].appendChild(newChild[j])
						}
					} else {
						this[i].appendChild(newChild)
					}
				}
				return this
			},
			prepend: function(newChild) {
				var i, j;
				for (i = 0; i < this.length; i++) {
					if (typeof newChild === 'string') {
						var tempDiv = document.createElement('div');
						tempDiv.innerHTML = newChild;
						for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
							this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0])
						}
					} else if (newChild instanceof Dom7) {
						for (j = 0; j < newChild.length; j++) {
							this[i].insertBefore(newChild[j], this[i].childNodes[0])
						}
					} else {
						this[i].insertBefore(newChild, this[i].childNodes[0])
					}
				}
				return this
			},
			insertBefore: function(selector) {
				var before = $(selector);
				for (var i = 0; i < this.length; i++) {
					if (before.length === 1) {
						before[0].parentNode.insertBefore(this[i], before[0])
					} else if (before.length > 1) {
						for (var j = 0; j < before.length; j++) {
							before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j])
						}
					}
				}
			},
			insertAfter: function(selector) {
				var after = $(selector);
				for (var i = 0; i < this.length; i++) {
					if (after.length === 1) {
						after[0].parentNode.insertBefore(this[i], after[0].nextSibling)
					} else if (after.length > 1) {
						for (var j = 0; j < after.length; j++) {
							after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling)
						}
					}
				}
			},
			next: function(selector) {
				if (this.length > 0) {
					if (selector) {
						if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
						else return new Dom7([])
					} else {
						if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
						else return new Dom7([])
					}
				} else return new Dom7([])
			},
			nextAll: function(selector) {
				var nextEls = [];
				var el = this[0];
				if (!el) return new Dom7([]);
				while (el.nextElementSibling) {
					var next = el.nextElementSibling;
					if (selector) {
						if ($(next).is(selector)) nextEls.push(next)
					} else nextEls.push(next);
					el = next
				}
				return new Dom7(nextEls)
			},
			prev: function(selector) {
				if (this.length > 0) {
					if (selector) {
						if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
						else return new Dom7([])
					} else {
						if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
						else return new Dom7([])
					}
				} else return new Dom7([])
			},
			prevAll: function(selector) {
				var prevEls = [];
				var el = this[0];
				if (!el) return new Dom7([]);
				while (el.previousElementSibling) {
					var prev = el.previousElementSibling;
					if (selector) {
						if ($(prev).is(selector)) prevEls.push(prev)
					} else prevEls.push(prev);
					el = prev
				}
				return new Dom7(prevEls)
			},
			parent: function(selector) {
				var parents = [];
				for (var i = 0; i < this.length; i++) {
					if (selector) {
						if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode)
					} else {
						parents.push(this[i].parentNode)
					}
				}
				return $($.unique(parents))
			},
			parents: function(selector) {
				var parents = [];
				for (var i = 0; i < this.length; i++) {
					var parent = this[i].parentNode;
					while (parent) {
						if (selector) {
							if ($(parent).is(selector)) parents.push(parent)
						} else {
							parents.push(parent)
						}
						parent = parent.parentNode
					}
				}
				return $($.unique(parents))
			},
			find: function(selector) {
				var foundElements = [];
				for (var i = 0; i < this.length; i++) {
					var found = this[i].querySelectorAll(selector);
					for (var j = 0; j < found.length; j++) {
						foundElements.push(found[j])
					}
				}
				return new Dom7(foundElements)
			},
			children: function(selector) {
				var children = [];
				for (var i = 0; i < this.length; i++) {
					var childNodes = this[i].childNodes;
					for (var j = 0; j < childNodes.length; j++) {
						if (!selector) {
							if (childNodes[j].nodeType === 1) children.push(childNodes[j])
						} else {
							if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j])
						}
					}
				}
				return new Dom7($.unique(children))
			},
			remove: function() {
				for (var i = 0; i < this.length; i++) {
					if (this[i].parentNode) this[i].parentNode.removeChild(this[i])
				}
				return this
			},
			add: function() {
				var dom = this;
				var i, j;
				for (i = 0; i < arguments.length; i++) {
					var toAdd = $(arguments[i]);
					for (j = 0; j < toAdd.length; j++) {
						dom[dom.length] = toAdd[j];
						dom.length++
					}
				}
				return dom
			}
		};
		$.fn = Dom7.prototype;
		$.unique = function(arr) {
			var unique = [];
			for (var i = 0; i < arr.length; i++) {
				if (unique.indexOf(arr[i]) === -1) unique.push(arr[i])
			}
			return unique
		};
		return $
	})();
	var rbsliderDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
	function addLibraryPlugin(lib) {
		lib.fn.rbslider = function(params) {
			var firstInstance;
			lib(this).each(function() {
				var s = new Rbslider(this, params);
				if (!firstInstance) firstInstance = s
			});
			return firstInstance
		}
	}
	for (var i = 0; i < rbsliderDomPlugins.length; i++) {
		if (window[rbsliderDomPlugins[i]]) {
			addLibraryPlugin(window[rbsliderDomPlugins[i]])
		}
	}
	var domLib;
	if (typeof Dom7 === 'undefined') {
		domLib = window.Dom7 || window.Zepto || window.jQuery
	} else {
		domLib = Dom7
	}
	if (domLib) {
		if (! ('transitionEnd' in domLib.fn)) {
			domLib.fn.transitionEnd = function(callback) {
				var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
				i,
				j,
				dom = this;
				function fireCallBack(e) {
					if (e.target !== this) return;
					callback.call(this, e);
					for (i = 0; i < events.length; i++) {
						dom.off(events[i], fireCallBack)
					}
				}
				if (callback) {
					for (i = 0; i < events.length; i++) {
						dom.on(events[i], fireCallBack)
					}
				}
				return this
			}
		}
		if (! ('transform' in domLib.fn)) {
			domLib.fn.transform = function(transform) {
				for (var i = 0; i < this.length; i++) {
					var elStyle = this[i].style;
					elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform
				}
				return this
			}
		}
		if (! ('transition' in domLib.fn)) {
			domLib.fn.transition = function(duration) {
				if (typeof duration !== 'string') {
					duration = duration + 'ms'
				}
				for (var i = 0; i < this.length; i++) {
					var elStyle = this[i].style;
					elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration
				}
				return this
			}
		}
	}
})();
if (typeof(module) !== 'undefined') {
	module.exports = Rbslider
} else if (typeof define === 'function' && define.amd) {
	define([],
	function() {
		'use strict';
		return Rbslider
	})
}
$("nav li a[data-name='home']").addClass("cur");
var caseListHtml = $(".case-list").html(),
equipmentListHtml = $(".equipment-list").html(),
rbslider2 = null,
rbsliderInterval = 0,
rbslider3 = null,
rbsliderInterval2 = 0;
function initCaseList() {
	var b = $(window).width();
	860 > b && 0 == $(".rbslider-item-list-rbslider").size() ? ($(".case-list,.equipment-list").addClass("rbslider-item-list-rbslider").addClass("rbslider-container").find("ul").addClass("rbslider-wrapper").find("li").addClass("rbslider-slide"), rbsliderInterval = setInterval(function() {
		var a = $(".case-list .rbslider-slide").width();
		a > .88 * a && (clearInterval(rbsliderInterval), $(".rbslider-item-list-container .navigation").show(), rbslider2 = new Rbslider(".case-list", {
			nextButton: ".page3 .rbslider-item-list-container .next",
			prevButton: ".page3 .rbslider-item-list-container .prev",
			pagination: ".page3 .rbslider-pagination",
			paginationClickable: !0,
			spaceBetween: 0,
			loop: !0,
			speed: 1200,
			autoplay: 2E3,
			slideToClickedSlide: !0,
			autoplayDisableOnInteraction: !0
		}))
	},
	300), rbsliderInterval2 = setInterval(function() {
		var a = $(".equipment-list .rbslider-slide").width();
		a > .88 * a && (clearInterval(rbsliderInterval2), rbslider2 = new Rbslider(".equipment-list", {
			nextButton: ".page5 .rbslider-item-list-container .next",
			prevButton: ".page5 .rbslider-item-list-container .prev",
			spaceBetween: 0,
			loop: !0,
			speed: 1200,
			autoplay: 3E3,
			slideToClickedSlide: !0,
			autoplayDisableOnInteraction: !0
		}))
	},
	300)) : 860 < b && 0 < $(".rbslider-item-list-rbslider").size() && (clearInterval(rbsliderInterval), rbslider2 && rbslider2.destroy(), clearInterval(rbsliderInterval2), rbslider3 && rbslider3.destroy(), $(".rbslider-item-list-container .navigation").hide(), $(".case-list,.equipment-list").removeClass("rbslider-container").removeClass("rbslider-item-list-rbslider"), $(".case-list").html(caseListHtml), $(".equipment-list").html(equipmentListHtml))
}
function initPartnerImg() {
	var b = $(".partner-list li").height();
	$(".partner-list li").each(function() {
		var a = $(this).find("img"),
		c = a.height();
		0 < b && a.css("margin-top", (b - c) / 2)
	})
}
$(function() {
	$(".page-container").ronbongpage({
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9'],
		menu: '#menu',
		navigation: !0,
		onLeave: function(a, c) {
			1 < c ? $("header").addClass("down") : $("header").removeClass("down")
		}
	}); (function() {
		function a() {
			var a = 20 * d;
			$(".home-news ul").css({
				marginTop: -a
			});
			d++;
			d = d >= b ? 0 : d
		}
		var c = 0,
		d = 0,
		b = $(".home-news ul li").size();
		$(".home-news ul li").mouseenter(function() {
			clearInterval(c)
		}).mouseleave(function() {
			c = setInterval(a, 2600)
		});
		a();
		c = setInterval(a, 2600)
	})(); (function() {
		function a() {
			$(".home-about li").removeClass("cur").eq(d).addClass("cur");
			var a = $(".home-about-navi li").eq(d),
			c = $(".home-about-navi").offset();
			700 < $(window).width() ? (a = a.offset().top - c.top, $(".home-about-navi li.bg").css({
				top: a,
				left: 0
			})) : (a = a.offset().left - c.left, $(".home-about-navi li.bg").css({
				left: a,
				top: 0
			}));
			d++;
			d = d >= b ? 0 : d
		}
		var c = 0,
		d = 0,
		b = $(".home-about li").size();
		$(".home-about li").mouseenter(function() {
			clearInterval(c)
		}).mouseleave(function() {
			c = setInterval(a, 2300)
		});
		a();
		c = setInterval(a, 2300);
		$(".home-about-navi li").mouseenter(function() {
			if (700 < $(window).width()) {
				var b = $(this).offset().top - $(".home-about-navi").offset().top;
				$(".home-about-navi li.bg").css({
					top: b,
					left: 0
				})
			} else b = $(this).offset().left - $(".home-about-navi").offset().left,
			$(".home-about-navi li.bg").css({
				left: b,
				top: 0
			});
			clearInterval(c);
			d = $(this).index();
			a();
			c = setInterval(a, 2300)
		})
	})();
	initPartnerImg();
	$(".partner-list li:last").find("img").load(function() {
		initPartnerImg()
	});
	new Rbslider(".rbslider-container", {
		pagination: ".page1 .rbslider-pagination",
		paginationClickable: !0,
		spaceBetween: 0,
		speed: 1300,
		autoplay: 5E3,
		slideToClickedSlide: !0,
		autoplayDisableOnInteraction: !0
	});
	$(".rbslider-container .move-down").click(function() {
		$("#fp-nav li").eq(1).find("a").trigger("click")
	});
	initCaseList();
	var b = 0;
	$(window).resize(function() {
		0 < b && clearTimeout(b);
		var a = $(this).width();
		b = setTimeout(function() {
			initCaseList();
			680 < a && $("header nav ul").removeClass("show")
		},
		500)
	})
});