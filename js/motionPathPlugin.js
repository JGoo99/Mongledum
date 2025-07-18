/*!
 * MotionPathPlugin 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports)
        : "function" == typeof define && define.amd ? define(["exports"], e)
            : e((t = t || self).window = t.window || {})
}(this, function (t) {
    "use strict";
    
    function p(t) {
        return "string" == typeof t
    }
    
    function x(t) {
        return Math.round(1e10 * t) / 1e10 || 0
    }
    
    function y(t, e, n, r) {
        var a = t[e], o = 1 === r ? 6 : subdivideSegment(a, n, r);
        if ((o || !r) && o + n + 2 < a.length) {
            return t.splice(e, 0,
                a.slice(0, n + o + 2)), a.splice(0, n + o), 1
        }
    }
    
    function C(t, e) {
        var n = t.length, r = t[n - 1] || [], a = r.length;
        n && e[0] === r[a - 2] && e[1] === r[a - 1] && (e = r.concat(
            e.slice(2)), n--), t[n] = e
    }
    
    var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        T = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        L = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi, r = /(^[#\.][a-z]|[a-y][a-z])/i,
        V = Math.PI / 180, s = 180 / Math.PI, F = Math.sin, U = Math.cos,
        H = Math.abs, $ = Math.sqrt, l = Math.atan2, A = 1e8,
        h = function _isNumber(t) {
            return "number" == typeof t
        }, S = {}, _ = {}, e = 1e5, d = function _wrapProgress(t) {
            return Math.round((t + A) % 1 * e) / e || (t < 0 ? 0 : 1)
        }, N = function _round(t) {
            return Math.round(t * e) / e || 0
        }, m = function _getSampleIndex(t, e, n) {
            var r = t.length, a = ~~(n * r);
            if (t[a] > e) {
                for (; --a && t[a] > e;) {
                    ;
                }
                a < 0 && (a = 0)
            } else {
                for (; t[++a] < e && a < r;) {
                    ;
                }
            }
            return a < r ? a : r - 1
        }, O = function _copyMetaData(t, e) {
            return e.totalLength = t.totalLength, t.samples
                ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(
                    0), e.minLength = t.minLength, e.resolution = t.resolution)
                : t.totalPoints && (e.totalPoints = t.totalPoints), e
        };
    
    function getRawPath(t) {
        var e, n = (t = p(t) && r.test(t) && document.querySelector(t)
            || t).getAttribute ? t : 0;
        return n && (t = t.getAttribute("d")) ? (n._gsPath
        || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e
            : n._gsPath[t] = stringToRawPath(t)) : t ? p(t) ? stringToRawPath(t)
            : h(t[0]) ? [t] : t : console.warn(
            "Expecting a <path> element or an SVG path data string")
    }
    
    function reverseSegment(t) {
        var e, n = 0;
        for (t.reverse(); n < t.length; n += 2) {
            e = t[n], t[n] = t[n + 1], t[n
            + 1] = e;
        }
        t.reversed = !t.reversed
    }
    
    var B = {
        rect: "rx,ry,x,y,width,height",
        circle: "r,cx,cy",
        ellipse: "rx,ry,cx,cy",
        line: "x1,x2,y1,y2"
    };
    
    function convertToPath(t, e) {
        var n, r, a, o, i, s, l, h, u, g, f, p, c, d, m, v, y, w, x, P, b, M,
            R = t.tagName.toLowerCase(), L = .552284749831;
        return "path" !== R && t.getBBox ? (s = function _createPath(t, e) {
            var n, r = document.createElementNS("http://www.w3.org/2000/svg",
                "path"), a = [].slice.call(t.attributes), o = a.length;
            for (e = "," + e + ",";
                -1 < --o;) {
                n = a[o].nodeName.toLowerCase(), e.indexOf(
                    "," + n + ",") < 0 && r.setAttributeNS(null, n,
                    a[o].nodeValue);
            }
            return r
        }(t,
            "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = function _attrToObj(t,
            e) {
            for (var n = e ? e.split(",") : [], r = {}, a = n.length;
                -1 < --a;) {
                r[n[a]] = +t.getAttribute(n[a]) || 0;
            }
            return r
        }(t, B[R]), "rect" === R ? (o = M.rx, i = M.ry
            || o, r = M.x, a = M.y, g = M.width - 2 * o, f = M.height - 2
            * i, n = o || i ? "M" + (v = (d = (c = r + o) + g) + o) + ","
            + (w = a + i) + " V" + (x = w + f) + " C" + [v, P = x + i * L,
                m = d + o * L, b = x + i, d, b, d - (d - c) / 3, b,
                c + (d - c) / 3, b, c, b, p = r + o * (1 - L), b, r, P, r, x, r,
                x - (x - w) / 3, r, w + (x - w) / 3, r, w, r,
                y = a + i * (1 - L), p, a, c, a, c + (d - c) / 3, a,
                d - (d - c) / 3, a, d, a, m, a, v, y, v, w].join(",") + "z"
            : "M" + (r + g) + "," + a + " v" + f + " h" + -g + " v" + -f + " h"
            + g + "z") : "circle" === R || "ellipse" === R ? (h = "circle" === R
            ? (o = i = M.r) * L : (o = M.rx, (i = M.ry) * L), n = "M"
            + ((r = M.cx) + o) + "," + (a = M.cy) + " C" + [r + o, a + h,
                r + (l = o * L), a + i, r, a + i, r - l, a + i, r - o, a + h,
                r - o, a, r - o, a - h, r - l, a - i, r, a - i, r + l, a - i,
                r + o, a - h, r + o, a].join(",") + "z") : "line" === R
            ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2
            : "polyline" !== R && "polygon" !== R || (n = "M"
            + (r = (u = (t.getAttribute("points") + "").match(T) || []).shift())
            + "," + (a = u.shift()) + " L" + u.join(","), "polygon" === R
        && (n += "," + r + "," + a + "z")), s.setAttribute("d",
            rawPathToString(s._gsRawPath = stringToRawPath(n))), e
        && t.parentNode && (t.parentNode.insertBefore(s,
            t), t.parentNode.removeChild(t)), s) : t
    }
    
    function getRotationAtBezierT(t, e, n) {
        var r, a = t[e], o = t[e + 2], i = t[e + 4];
        return a += (o - a) * n, a += ((o += (i - o) * n) - a) * n, r = o + (i
            + (t[e + 6] - i) * n - o) * n - a, a = t[e + 1], a += ((o = t[e
        + 3]) - a) * n, a += ((o += ((i = t[e + 5]) - o) * n) - a) * n, N(
            l(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s)
    }
    
    function sliceRawPath(t, e, n) {
        n = function _isUndefined(t) {
            return void 0 === t
        }(n) ? 1 : x(n) || 0, e = x(e) || 0;
        var r = Math.max(0, ~~(H(n - e) - 1e-8)), a = function copyRawPath(t) {
            for (var e = [], n = 0; n < t.length; n++) {
                e[n] = O(t[n],
                    t[n].slice(0));
            }
            return O(t, e)
        }(t);
        if (n < e && (e = 1 - e, n = 1 - n, function _reverseRawPath(t, e) {
            var n = t.length;
            for (e || t.reverse(); n--;) {
                t[n].reversed || reverseSegment(t[n])
            }
        }(a), a.totalLength = 0), e < 0 || n < 0) {
            var o = Math.abs(~~Math.min(e, n)) + 1;
            e += o, n += o
        }
        a.totalLength || cacheRawPathMeasurements(a);
        var i, s, l, h, u, g, f, p, c = 1 < n, d = getProgressData(a, e, S, !0),
            m = getProgressData(a, n, _), v = m.segment, w = d.segment,
            P = m.segIndex, b = d.segIndex, M = m.i, R = d.i, L = b === P,
            T = M === R && L;
        if (c || r) {
            for (i = P < b || L && M < R || T && m.t < d.t, y(a, b, R, d.t)
            && (b++, i || (P++, T ? (m.t = (m.t - d.t) / (1 - d.t), M = 0) : L
                && (M -= R))), Math.abs(1 - (n - e)) < 1e-5 ? P = b - 1 : !m.t
            && P ? P-- : y(a, P, M, m.t) && i && b++, 1 === d.t && (b = (b + 1)
                % a.length), u = [], f = 1 + (g = a.length) * r, f += (g
                - (p = b) + P) % g, h = 0; h < f; h++) {
                C(u, a[p++ % g]);
            }
            a = u
        } else if (l = 1 === m.t ? 6 : subdivideSegment(v, M, m.t), e
        !== n) {
            for (s = subdivideSegment(w, R, T ? d.t / m.t : d.t), L
            && (l += s), v.splice(M + l + 2), (s || R) && w.splice(0,
                R + s), h = a.length; h--;) {
                (h < b || P < h) && a.splice(h,
                    1);
            }
        } else {
            v.angle = getRotationAtBezierT(v, M + l,
                0), d = v[M += l], m = v[M
            + 1], v.length = v.totalLength = 0, v.totalPoints = a.totalPoints = 8, v.push(
                d, m, d, m, d, m, d, m);
        }
        return a.totalLength = 0, a
    }
    
    function measureSegment(t, e, n) {
        e = e || 0, t.samples || (t.samples = [], t.lookup = []);
        var r, a, o, i, s, l, h, u, g, f, p, c, d, m, v, y, w,
            x = ~~t.resolution || 12, P = 1 / x,
            b = n ? e + 6 * n + 1 : t.length, M = t[e], R = t[e + 1],
            L = e ? e / 6 * x : 0, T = t.samples, C = t.lookup,
            S = (e ? t.minLength : A) || A, _ = T[L + n * x - 1],
            N = e ? T[L - 1] : 0;
        for (T.length = C.length = 0, a = e + 2; a < b; a += 6) {
            if (o = t[a + 4] - M, i = t[a + 2] - M, s = t[a] - M, u = t[a + 5]
                - R, g = t[a + 3] - R, f = t[a + 1] - R, l = h = p = c = 0, H(o)
            < .01 && H(u) < .01 && H(s) + H(f) < .01) {
                8 < t.length && (t.splice(
                    a, 6), a -= 6, b -= 6);
            } else {
                for (r = 1; r <= x; r++) {
                    l = h
                        - (h = ((m = P * r) * m * o + 3 * (d = 1 - m) * (m * i
                                + d * s))
                            * m), p = c - (c = (m * m * u + 3 * d * (m * g + d
                            * f))
                        * m), (y = $(p * p + l * l)) < S
                    && (S = y), N += y, T[L++] = N;
                }
            }
            M += o, R += u
        }
        if (_) {
            for (_ -= N; L < T.length; L++) {
                T[L] += _;
            }
        }
        if (T.length && S) {
            if (t.totalLength = w = T[T.length - 1] || 0, w / (t.minLength = S)
            < 9999) {
                for (y = v = 0, r = 0; r < w; r += S) {
                    C[y++] = T[v] < r
                        ? ++v : v
                }
            }
        } else {
            t.totalLength = T[0] = 0;
        }
        return e ? N - T[e / 2 - 1] : N
    }
    
    function cacheRawPathMeasurements(t, e) {
        var n, r, a;
        for (a = n = r = 0; a < t.length; a++) {
            t[a].resolution = ~~e
                || 12, r += t[a].length, n += measureSegment(t[a]);
        }
        return t.totalPoints = r, t.totalLength = n, t
    }
    
    function subdivideSegment(t, e, n) {
        if (n <= 0 || 1 <= n) {
            return 0;
        }
        var r = t[e], a = t[e + 1], o = t[e + 2], i = t[e + 3], s = t[e + 4],
            l = t[e + 5], h = r + (o - r) * n, u = o + (s - o) * n,
            g = a + (i - a) * n, f = i + (l - i) * n, p = h + (u - h) * n,
            c = g + (f - g) * n, d = s + (t[e + 6] - s) * n,
            m = l + (t[e + 7] - l) * n;
        return u += (d - u) * n, f += (m - f) * n, t.splice(e + 2, 4, N(h),
            N(g), N(p), N(c), N(p + (u - p) * n), N(c + (f - c) * n), N(u),
            N(f), N(d), N(m)), t.samples && t.samples.splice(
            e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6
    }
    
    function getProgressData(t, e, n, r) {
        n = n || {}, t.totalLength || cacheRawPathMeasurements(t), (e < 0 || 1
            < e) && (e = d(e));
        var a, o, i, s, l, h, u, g = 0, f = t[0];
        if (e) {
            if (1 === e) {
                u = 1, h = (f = t[g = t.length - 1]).length
                    - 8;
            } else {
                if (1 < t.length) {
                    for (i = t.totalLength * e, l = h = 0;
                        (l += t[h++].totalLength) < i;) {
                        g = h;
                    }
                    e = (i - (s = l - (f = t[g]).totalLength)) / (l - s) || 0
                }
                a = f.samples, o = f.resolution, i = f.totalLength
                    * e, s = (h = f.lookup.length ? f.lookup[~~(i
                        / f.minLength)]
                    || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h]) < i
                && (s = l, l = a[++h]), u = 1 / o * ((i - s) / (l - s) + h
                    % o), h = 6 * ~~(h / o), r && 1 === u && (h + 6 < f.length
                    ? (h += 6, u = 0) : g + 1 < t.length
                    && (h = u = 0, f = t[++g]))
            }
        } else {
            u = h = g = 0, f = t[0];
        }
        return n.t = u, n.i = h, n.path = t, n.segment = f, n.segIndex = g, n
    }
    
    function getPositionOnPath(t, e, n, r) {
        var a, o, i, s, l, h, u, g, f, p = t[0], c = r || {};
        if ((e < 0 || 1 < e) && (e = d(e)), p.lookup
        || cacheRawPathMeasurements(t), 1 < t.length) {
            for (i = t.totalLength * e, l = h = 0;
                (l += t[h++].totalLength) < i;) {
                p = t[h];
            }
            e = (i - (s = l - p.totalLength)) / (l - s) || 0
        }
        return a = p.samples, o = p.resolution, i = p.totalLength
            * e, s = (h = p.lookup.length ? p.lookup[e < 1 ? ~~(i / p.minLength)
            : p.lookup.length - 1] || 0 : m(a, i, e)) ? a[h - 1] : 0, (l = a[h])
        < i && (s = l, l = a[++h]), f = 1 - (u = 1 / o * ((i - s) / (l - s) + h
            % o) || 0), g = p[h = 6 * ~~(h / o)], c.x = N(
            (u * u * (p[h + 6] - g) + 3 * f * (u * (p[h + 4] - g) + f * (p[h
            + 2] - g))) * u + g), c.y = N(
            (u * u * (p[h + 7] - (g = p[h + 1])) + 3 * f * (u * (p[h + 5] - g)
                + f * (p[h + 3] - g))) * u + g), n && (c.angle = p.totalLength
            ? getRotationAtBezierT(p, h, 1 <= u ? 1 - 1e-9 : u || 1e-9)
            : p.angle || 0), c
    }
    
    function transformRawPath(t, e, n, r, a, o, i) {
        for (var s, l, h, u, g, f = t.length;
            -1 < --f;) {
            for (l = (s = t[f]).length, h = 0; h < l;
                h += 2) {
                u = s[h], g = s[h + 1], s[h] = u * e + g * r + o, s[h
                + 1] = u * n + g * a + i;
            }
        }
        return t._dirty = 1, t
    }
    
    function arcToSegment(t, e, n, r, a, o, i, s, l) {
        if (t !== s || e !== l) {
            n = H(n), r = H(r);
            var h = a % 360 * V, u = U(h), g = F(h), f = Math.PI, p = 2 * f,
                c = (t - s) / 2, d = (e - l) / 2, m = u * c + g * d,
                v = -g * c + u * d, y = m * m, w = v * v,
                x = y / (n * n) + w / (r * r);
            1 < x && (n = $(x) * n, r = $(x) * r);
            var P = n * n, b = r * r,
                M = (P * b - P * w - b * y) / (P * w + b * y);
            M < 0 && (M = 0);
            var R = (o === i ? -1 : 1) * $(M), L = n * v / r * R,
                T = -r * m / n * R, C = u * L - g * T + (t + s) / 2,
                S = g * L + u * T + (e + l) / 2, _ = (m - L) / n,
                N = (v - T) / r, A = (-m - L) / n, O = (-v - T) / r,
                B = _ * _ + N * N, E = (N < 0 ? -1 : 1) * Math.acos(_ / $(B)),
                I = (_ * O - N * A < 0 ? -1 : 1) * Math.acos(
                    (_ * A + N * O) / $(B * (A * A + O * O)));
            isNaN(I) && (I = f), !i && 0 < I ? I -= p : i && I < 0
                && (I += p), E %= p, I %= p;
            var D, X = Math.ceil(H(I) / (p / 4)), k = [], z = I / X,
                G = 4 / 3 * F(z / 2) / (1 + U(z / 2)), Z = u * n, q = g * n,
                Y = g * -r, j = u * r;
            for (D = 0; D < X; D++) {
                m = U(a = E + D * z), v = F(a), _ = U(
                    a += z), N = F(a), k.push(m - G * v, v + G * m, _ + G * N,
                    N - G * _, _, N);
            }
            for (D = 0; D < k.length; D += 2) {
                m = k[D], v = k[D + 1], k[D] = m
                    * Z + v * Y + C, k[D + 1] = m * q + v * j + S;
            }
            return k[D - 2] = s, k[D - 1] = l, k
        }
    }
    
    function stringToRawPath(t) {
        function Cf(t, e, n, r) {
            u = (n - t) / 3, g = (r - e) / 3, s.push(t + u, e + g, n - u, r - g,
                n, r)
        }
        
        var e, n, r, a, o, i, s, l, h, u, g, f, p, c, d,
            m = (t + "").replace(L, function (t) {
                var e = +t;
                return e < 1e-4 && -1e-4 < e ? 0 : e
            }).match(M) || [], v = [], y = 0, w = 0, x = m.length, P = 0,
            b = "ERROR: malformed path: " + t;
        if (!t || !isNaN(m[0]) || isNaN(m[1])) {
            return console.log(b), v;
        }
        for (e = 0; e < x; e++) {
            if (p = o, isNaN(m[e])
                ? i = (o = m[e].toUpperCase()) !== m[e] : e--, r = +m[e
            + 1], a = +m[e + 2], i && (r += y, a += w), e || (l = r, h = a), "M"
            === o) {
                s && (s.length < 8 ? --v.length
                    : P += s.length), y = l = r, w = h = a, s = [r, a], v.push(
                    s), e += 2, o = "L";
            } else if ("C" === o) {
                i || (y = w = 0), (s = s
                    || [0, 0]).push(r, a, y + 1 * m[e + 3], w + 1 * m[e + 4],
                    y += 1 * m[e + 5], w += 1 * m[e + 6]), e += 6;
            } else if ("S"
                === o) {
                u = y, g = w, "C" !== p && "S" !== p || (u += y - s[s.length
                - 4], g += w - s[s.length - 3]), i || (y = w = 0), s.push(u, g,
                    r, a,
                    y += 1 * m[e + 3], w += 1 * m[e + 4]), e += 4;
            } else if ("Q"
                === o) {
                u = y + 2 / 3 * (r - y), g = w + 2 / 3 * (a - w), i
                || (y = w = 0), y += 1 * m[e + 3], w += 1 * m[e + 4], s.push(u,
                    g,
                    y + 2 / 3 * (r - y), w + 2 / 3 * (a - w), y,
                    w), e += 4;
            } else if ("T" === o) {
                u = y - s[s.length - 4], g = w
                    - s[s.length - 3], s.push(y + u, w + g,
                    r + 2 / 3 * (y + 1.5 * u - r),
                    a + 2 / 3 * (w + 1.5 * g - a), y = r,
                    w = a), e += 2;
            } else if ("H" === o) {
                Cf(y, w, y = r,
                    w), e += 1;
            } else if ("V" === o) {
                Cf(y, w, y,
                    w = r + (i ? w - y : 0)), e += 1;
            } else if ("L" === o || "Z"
                === o) {
                "Z" === o && (r = l, a = h, s.closed = !0), ("L" === o || .5
                    < H(y - r) || .5 < H(w - a)) && (Cf(y, w, r, a), "L" === o
                && (e += 2)), y = r, w = a;
            } else if ("A" === o) {
                if (c = m[e + 4], d = m[e + 5], u = m[e + 6], g = m[e
                + 7], n = 7, 1
                < c.length && (c.length < 3 ? (g = u, u = d, n--)
                    : (g = d, u = c.substr(2), n -= 2), d = c.charAt(
                    1), c = c.charAt(0)), f = arcToSegment(y, w, +m[e + 1],
                    +m[e + 2], +m[e + 3], +c, +d, (i ? y : 0) + 1 * u,
                    (i ? w : 0) + 1 * g), e += n, f) {
                    for (n = 0; n < f.length;
                        n++) {
                        s.push(f[n]);
                    }
                }
                y = s[s.length - 2], w = s[s.length - 1]
            } else {
                console.log(b);
            }
        }
        return (e = s.length) < 6 ? (v.pop(), e = 0) : s[0] === s[e - 2] && s[1]
            === s[e - 1] && (s.closed = !0), v.totalPoints = P + e, v
    }
    
    function flatPointsToSegment(t, e) {
        void 0 === e && (e = 1);
        for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length;
            o += 2) {
            a.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r);
        }
        return a
    }
    
    function pointsToSegment(t, e) {
        H(t[0] - t[2]) < 1e-4 && H(t[1] - t[3]) < 1e-4 && (t = t.slice(2));
        var n, r, a, o, i, s, l, h, u, g, f, p, c, d, m = t.length - 2,
            v = +t[0], y = +t[1], w = +t[2], x = +t[3], P = [v, y, v, y],
            b = w - v, M = x - y,
            R = Math.abs(t[m] - v) < .001 && Math.abs(t[m + 1] - y) < .001;
        for (R && (t.push(w, x), w = v, x = y, v = t[m - 2], y = t[m
        - 1], t.unshift(v, y), m += 4), e = e || 0 === e ? +e : 1, a = 2; a < m;
            a += 2) {
            n = v, r = y, v = w, y = x, w = +t[a + 2], x = +t[a + 3], v
            === w && y === x || (o = b, i = M, b = w - v, M = x
                - y, h = ((s = $(
                o * o + i * i)) + (l = $(b * b + M * M))) * e * .25 / $(
                Math.pow(b / l + o / s, 2) + Math.pow(M / l + i / s, 2)), f = v
                - ((u = v - (v - n) * (s ? h / s : 0)) + (((g = v + (w - v) * (l
                    ? h
                    / l : 0)) - u) * (3 * s / (s + l) + .5) / 4 || 0)), d = y
                - ((p = y - (y - r) * (s ? h / s : 0)) + (((c = y + (x - y) * (l
                    ? h
                    / l : 0)) - p) * (3 * s / (s + l) + .5) / 4 || 0)), v === n
            && y
            === r || P.push(N(u + f), N(p + d), N(v), N(y), N(g + f),
                N(c + d)));
        }
        return v !== w || y !== x || P.length < 4 ? P.push(N(w), N(x), N(w),
            N(x)) : P.length -= 2, 2 === P.length ? P.push(v, y, v, y, v, y) : R
            && (P.splice(0, 6), P.length = P.length - 6), P
    }
    
    function rawPathToString(t) {
        h(t[0]) && (t = [t]);
        var e, n, r, a, o = "", i = t.length;
        for (n = 0; n < i; n++) {
            for (a = t[n], o += "M" + N(a[0]) + "," + N(a[1])
                + " C", e = a.length, r = 2; r < e; r++) {
                o += N(a[r++]) + ","
                    + N(a[r++]) + " " + N(a[r++]) + "," + N(a[r++]) + " " + N(
                        a[r++]) + "," + N(a[r]) + " ";
            }
            a.closed && (o += "z")
        }
        return o
    }
    
    function R(t) {
        var e = t.ownerDocument || t;
        !(z in t.style) && "msTransform" in t.style && (G = (z = "msTransform")
            + "Origin");
        for (; e.parentNode && (e = e.parentNode);) {
            ;
        }
        if (v = window, I = new j, e) {
            w = (c = e).documentElement, P = e.body, (D = c.createElementNS(
                "http://www.w3.org/2000/svg", "g")).style.transform = "none";
            var n = e.createElement("div"), r = e.createElement("div"),
                a = e && (e.body || e.firstElementChild);
            a && a.appendChild && (a.appendChild(n), n.appendChild(
                r), n.setAttribute("style",
                "position:static;transform:translate3d(0,0,1px)"), k = r.offsetParent
                !== n, a.removeChild(n))
        }
        return e
    }
    
    function X(t) {
        return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase()
            ? t : null)
    }
    
    function Z(t, e) {
        if (t.parentNode && (c || R(t))) {
            var n = X(t),
                r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg"
                    : "http://www.w3.org/1999/xhtml",
                a = n ? e ? "rect" : "g" : "div", o = 2 !== e ? 0 : 100,
                i = 3 === e ? 100 : 0,
                s = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;",
                l = c.createElementNS ? c.createElementNS(
                    r.replace(/^https/, "http"), a) : c.createElement(a);
            return e && (n ? (E = E || Z(t), l.setAttribute("width",
                .01), l.setAttribute("height", .01), l.setAttribute("transform",
                "translate(" + o + "," + i + ")"), E.appendChild(l)) : (b
            || ((b = Z(t)).style.cssText = s), l.style.cssText = s
                + "width:0.1px;height:0.1px;top:" + i + "px;left:" + o
                + "px", b.appendChild(l))), l
        }
        throw "Need document and parent."
    }
    
    function aa(t, e) {
        var n, r, a, o, i, s, l = X(t), h = t === l, u = l ? q : Y,
            g = t.parentNode,
            f = g && !l && g.shadowRoot && g.shadowRoot.appendChild
                ? g.shadowRoot : g;
        if (t === v) {
            return t;
        }
        if (u.length || u.push(Z(t, 1), Z(t, 2), Z(t, 3)), n = l ? E : b, l) {
            h
                ? (o = -(a = function _getCTM(t) {
                    var e, n = t.getCTM();
                    return n || (e = t.style[z], t.style[z] = "none", t.appendChild(
                        D), n = D.getCTM(), t.removeChild(D), e ? t.style[z] = e
                        : t.style.removeProperty(
                            z.replace(/([A-Z])/g, "-$1").toLowerCase())), n
                    || I.clone()
                }(t)).e / a.a, i = -a.f / a.d, r = I) : t.getBBox
                    ? (a = t.getBBox(), o = (r = (r = t.transform
                        ? t.transform.baseVal : {}).numberOfItems ? 1
                    < r.numberOfItems ? function _consolidate(t) {
                        for (var e = new j, n = 0; n < t.numberOfItems;
                            n++) {
                            e.multiply(t.getItem(n).matrix);
                        }
                        return e
                    }(r) : r.getItem(0).matrix : I).a * a.x + r.c * a.y, i = r.b
                        * a.x + r.d * a.y) : (r = new j, o = i = 0), e && "g"
            === t.tagName.toLowerCase() && (o = i = 0), (h ? l : g).appendChild(
                n), n.setAttribute("transform",
                "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e
                    + o) + "," + (r.f + i) + ")");
        } else {
            if (o = i = 0, k) {
                for (r = t.offsetParent, a = t;
                    (a = a && a.parentNode) && a !== r && a.parentNode;) {
                    4
                    < (v.getComputedStyle(a)[z] + "").length
                    && (o = a.offsetLeft, i = a.offsetTop, a = 0);
                }
            }
            if ("absolute" !== (s = v.getComputedStyle(t)).position && "fixed"
                !== s.position) {
                for (r = t.offsetParent;
                    g && g !== r;) {
                    o += g.scrollLeft || 0, i += g.scrollTop
                        || 0, g = g.parentNode;
                }
            }
            (a = n.style).top = t.offsetTop - i + "px", a.left = t.offsetLeft
                - o + "px", a[z] = s[z], a[G] = s[G], a.position = "fixed"
            === s.position ? "fixed" : "absolute", f.appendChild(n)
        }
        return n
    }
    
    function ba(t, e, n, r, a, o, i) {
        return t.a = e, t.b = n, t.c = r, t.d = a, t.e = o, t.f = i, t
    }
    
    var c, v, w, P, b, E, I, D, k, n, z = "transform", G = z + "Origin", q = [],
        Y = [], j = ((n = Matrix2D.prototype).inverse = function inverse() {
            var t = this.a, e = this.b, n = this.c, r = this.d, a = this.e,
                o = this.f, i = t * r - e * n || 1e-10;
            return ba(this, r / i, -e / i, -n / i, t / i, (n * o - r * a) / i,
                -(t * o - e * a) / i)
        }, n.multiply = function multiply(t) {
            var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e,
                i = this.f, s = t.a, l = t.c, h = t.b, u = t.d, g = t.e, f = t.f;
            return ba(this, s * e + h * r, s * n + h * a, l * e + u * r,
                l * n + u * a, o + g * e + f * r, i + g * n + f * a)
        }, n.clone = function clone() {
            return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f)
        }, n.equals = function equals(t) {
            var e = this.a, n = this.b, r = this.c, a = this.d, o = this.e,
                i = this.f;
            return e === t.a && n === t.b && r === t.c && a === t.d && o === t.e
                && i === t.f
        }, n.apply = function apply(t, e) {
            void 0 === e && (e = {});
            var n = t.x, r = t.y, a = this.a, o = this.b, i = this.c, s = this.d,
                l = this.e, h = this.f;
            return e.x = n * a + r * i + l || 0, e.y = n * o + r * s + h || 0, e
        }, Matrix2D);
    
    function Matrix2D(t, e, n, r, a, o) {
        void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n
        && (n = 0), void 0 === r && (r = 1), void 0 === a && (a = 0), void 0
        === o && (o = 0), ba(this, t, e, n, r, a, o)
    }
    
    function getGlobalMatrix(t, e, n, r) {
        if (!t || !t.parentNode || (c || R(t)).documentElement
            === t) {
            return new j;
        }
        var a = function _forceNonZeroScale(t) {
                for (var e, n; t && t !== P;) {
                    (n = t._gsap) && n.uncache && n.get(t,
                        "x"), n && !n.scaleX && !n.scaleY && n.renderTransform
                    && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), e
                        ? e.push(
                            n) : e = [n]), t = t.parentNode;
                }
                return e
            }(t), o = X(t) ? q : Y, i = aa(t, n), s = o[0].getBoundingClientRect(),
            l = o[1].getBoundingClientRect(), h = o[2].getBoundingClientRect(),
            u = i.parentNode, g = !r && function _isFixed(t) {
                return "fixed" === v.getComputedStyle(t).position
                    || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t)
                        : void 0)
            }(t), f = new j((l.left - s.left) / 100, (l.top - s.top) / 100,
                (h.left - s.left) / 100, (h.top - s.top) / 100,
                s.left + (g ? 0 : function _getDocScrollLeft() {
                    return v.pageXOffset || c.scrollLeft || w.scrollLeft || P.scrollLeft
                        || 0
                }()), s.top + (g ? 0 : function _getDocScrollTop() {
                return v.pageYOffset || c.scrollTop || w.scrollTop || P.scrollTop
                    || 0
            }()));
        if (u.removeChild(i), a) {
            for (s = a.length;
                s--;) {
                (l = a[s]).scaleX = l.scaleY = 0, l.renderTransform(1, l);
            }
        }
        return e ? f.inverse() : f
    }
    
    function na(t, e, n, r) {
        for (var a = e.length, o = 2 === r ? 0 : r, i = 0; i < a;
            i++) {
            t[o] = parseFloat(e[i][n]), 2 === r && (t[o + 1] = 0), o += 2;
        }
        return t
    }
    
    function oa(t, e, n) {
        return parseFloat(t._gsap.get(t, e, n || "px")) || 0
    }
    
    function pa(t) {
        var e, n = t[0], r = t[1];
        for (e = 2; e < t.length; e += 2) {
            n = t[e] += n, r = t[e + 1] += r
        }
    }
    
    function qa(t, e, n, r, a, o, i, s, l) {
        return e = "cubic" === i.type ? [e] : (!1 !== i.fromCurrent
        && e.unshift(oa(n, r, s), a ? oa(n, a, l) : 0), i.relative && pa(e), [(a
            ? pointsToSegment : flatPointsToSegment)(e, i.curviness)]), e = o(
            nt(e, n, i)), rt(t, n, r, e, "x", s), a && rt(t, n, a, e, "y",
            l), cacheRawPathMeasurements(e,
            i.resolution || (0 === i.curviness ? 20 : 12))
    }
    
    function ra(t) {
        return t
    }
    
    function ta(t, e, n) {
        var r, a = getGlobalMatrix(t), o = 0, i = 0;
        return "svg" === (t.tagName + "").toLowerCase()
            ? (r = t.viewBox.baseVal).width || (r = {
            width: +t.getAttribute("width"), height: +t.getAttribute("height")
        }) : r = e && t.getBBox && t.getBBox(), e && "auto" !== e && (o = e.push
            ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, i = e.push ? e[1]
            * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(
            o || i ? a.apply({x: o, y: i}) : {x: a.e, y: a.f})
    }
    
    function ua(t, e, n, r) {
        var a, o = getGlobalMatrix(t.parentNode, !0, !0),
            i = o.clone().multiply(getGlobalMatrix(e)), s = ta(t, n, o),
            l = ta(e, r, o), h = l.x, u = l.y;
        return i.e = i.f = 0, "auto" === r && e.getTotalLength && "path"
        === e.tagName.toLowerCase() && (a = e.getAttribute("d").match(f)
            || [], h += (a = i.apply({x: +a[0], y: +a[1]})).x, u += a.y), a
        && (h -= (a = i.apply(e.getBBox())).x, u -= a.y), i.e = h - s.x, i.f = u
            - s.y, i
    }
    
    var Q, g, W, J, K, o,
        tt = "x,translateX,left,marginLeft,xPercent".split(","),
        et = "y,translateY,top,marginTop,yPercent".split(","),
        i = Math.PI / 180, f = /[-+\.]*\d+\.?(?:e-|e\+)?\d*/g,
        nt = function _align(t, e, n) {
            var r, a, o, i = n.align, s = n.matrix, l = n.offsetX,
                h = n.offsetY, u = n.alignOrigin, g = t[0][0], f = t[0][1],
                p = oa(e, "x"), c = oa(e, "y");
            return t && t.length ? (i && ("self" === i || (r = J(i)[0] || e)
                === e ? transformRawPath(t, 1, 0, 0, 1, p - g, c - f) : (u && !1
                !== u[2] ? Q.set(e,
                        {transformOrigin: 100 * u[0] + "% " + 100 * u[1] + "%"})
                    : u = [oa(e, "xPercent") / -100,
                        oa(e, "yPercent") / -100], o = (a = ua(e, r, u,
                    "auto")).apply({x: g, y: f}), transformRawPath(t, a.a, a.b, a.c,
                    a.d, p + a.e - (o.x - a.e), c + a.f - (o.y - a.f)))), s
                    ? transformRawPath(t, s.a, s.b, s.c, s.d, s.e, s.f) : (l || h)
                    && transformRawPath(t, 1, 0, 0, 1, l || 0, h || 0), t)
                : getRawPath("M0,0L0,0")
        }, rt = function _addDimensionalPropTween(t, e, n, r, a, o) {
            var i = e._gsap, s = i.harness, l = s && s.aliases && s.aliases[n],
                h = l && l.indexOf(",") < 0 ? l : n,
                u = t._pt = new g(t._pt, e, h, 0, 0, ra, 0, i.set(e, h, t));
            u.u = W(i.get(e, h, o)) || 0, u.path = r, u.pp = a, t._props.push(h)
        }, a = {
            version: "3.13.0",
            name: "motionPath",
            register: function register(t, e, n) {
                W = (Q = t).utils.getUnit, J = Q.utils.toArray, K = Q.core.getStyleSaver, o = Q.core.reverting
                    || function () {
                    }, g = n
            },
            init: function init(t, e, n) {
                if (!Q) {
                    return console.warn(
                        "Please gsap.registerPlugin(MotionPathPlugin)"), !1;
                }
                "object" == typeof e && !e.style && e.path || (e = {path: e});
                var r, a, o = [], i = e.path, s = e.autoRotate, l = e.unitX,
                    h = e.unitY, u = e.x, g = e.y, f = i[0],
                    p = function _sliceModifier(e, n) {
                        return function (t) {
                            return e || 1 !== n ? sliceRawPath(t, e, n) : t
                        }
                    }(e.start, "end" in e ? e.end : 1);
                if (this.rawPaths = o, this.target = t, this.tween = n, this.styles = K
                    && K(t, "transform"), (this.rotate = s || 0 === s)
                && (this.rOffset = parseFloat(s)
                    || 0, this.radians = !!e.useRadians, this.rProp = e.rotation
                    || "rotation", this.rSet = t._gsap.set(t, this.rProp,
                    this), this.ru = W(t._gsap.get(t, this.rProp))
                    || 0), !Array.isArray(i) || "closed" in i || "number"
                == typeof f) {
                    cacheRawPathMeasurements(
                        r = p(nt(getRawPath(e.path), t, e)), e.resolution), o.push(
                        r), rt(this, t, e.x || "x", r, "x", e.unitX || "px"), rt(
                        this,
                        t, e.y || "y", r, "y", e.unitY || "px");
                } else {
                    for (a in f) {
                        !u && ~tt.indexOf(a) ? u = a : !g && ~et.indexOf(a)
                            && (g = a);
                    }
                    for (a in u && g ? o.push(
                        qa(this, na(na([], i, u, 0), i, g, 1), t, u, g, p, e,
                            l || W(i[0][u]), h || W(i[0][g]))) : u = g = 0, f) {
                        a
                        !== u && a !== g && o.push(
                            qa(this, na([], i, a, 2), t, a, 0, p, e, W(i[0][a])))
                    }
                }
                n.vars.immediateRender && this.render(n.progress(), this)
            },
            render: function render(t, e) {
                var n = e.rawPaths, r = n.length, a = e._pt;
                if (e.tween._time || !o()) {
                    for (1 < t ? t = 1 : t < 0 && (t = 0); r--;) {
                        getPositionOnPath(
                            n[r], t, !r && e.rotate, n[r]);
                    }
                    for (; a;) {
                        a.set(a.t, a.p, a.path[a.pp] + a.u, a.d,
                            t), a = a._next;
                    }
                    e.rotate && e.rSet(e.target, e.rProp,
                        n[0].angle * (e.radians ? i : 1) + e.rOffset + e.ru, e, t)
                } else {
                    e.styles.revert()
                }
            },
            getLength: function getLength(t) {
                return cacheRawPathMeasurements(getRawPath(t)).totalLength
            },
            sliceRawPath: sliceRawPath,
            getRawPath: getRawPath,
            pointsToSegment: pointsToSegment,
            stringToRawPath: stringToRawPath,
            rawPathToString: rawPathToString,
            transformRawPath: transformRawPath,
            getGlobalMatrix: getGlobalMatrix,
            getPositionOnPath: getPositionOnPath,
            cacheRawPathMeasurements: cacheRawPathMeasurements,
            convertToPath: function convertToPath$1(t, e) {
                return J(t).map(function (t) {
                    return convertToPath(t, !1 !== e)
                })
            },
            convertCoordinates: function convertCoordinates(t, e, n) {
                var r = getGlobalMatrix(e, !0, !0).multiply(getGlobalMatrix(t));
                return n ? r.apply(n) : r
            },
            getAlignMatrix: ua,
            getRelativePosition: function getRelativePosition(t, e, n, r) {
                var a = ua(t, e, n, r);
                return {x: a.e, y: a.f}
            },
            arrayToRawPath: function arrayToRawPath(t, e) {
                var n = na(na([], t, (e = e || {}).x || "x", 0), t, e.y || "y", 1);
                return e.relative && pa(n), ["cubic" === e.type ? n
                    : pointsToSegment(n, e.curviness)]
            }
        };
    !function _getGSAP() {
        return Q || "undefined" != typeof window && (Q = window.gsap)
            && Q.registerPlugin && Q
    }() || Q.registerPlugin(a), t.MotionPathPlugin = a, t.default = a;
    if (typeof (window) === "undefined" || window !== t) {
        Object.defineProperty(t, "__esModule", {value: !0})
    } else {
        delete t.default
    }
});
