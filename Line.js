
class _line {
    constructor() {
        this.m_nPts = 0;
        this.m_x1
        this.m_y1
        this.m_x2
        this.m_y2
    }

    //-------------------------------------------------------------------------
    _Line(_x1, _y1, _x2, _y2) {
        this.m_x1 = _x1;
        this.m_y1 = _y1;
        this.m_x2 = _x2;
        this.m_y2 = _y2;
        this.m_nPts = 2;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    addPoint(_x, _y) {
        if (this.m_nPts == 0) {
            this.m_x1 = _x;
            this.m_y1 = _y;
            this.m_nPts++;
        }
        else if (this.m_nPts == 1) {
            this.m_x2 = _x;
            this.m_y2 = _y;
            this.m_nPts++;
        }
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPoint( _t )
    {
     let vx = m_x2 - m_x1;
     let vy = m_y2 - m_y1;
     let xOn, yOn;
     if( _t < 0 )
     {
      xOn = m_x1;
      yOn = m_y1;
     }
     else if( _t > 1 )
     {
      xOn = m_x2;
      yOn = m_y2;
     }
     else
     {
      xOn = m_x1 + _t * vx;
      yOn = m_y1 + _t * vy;
     }
     return Point(xOn, yOn);
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    isPossible() {
        if (this.m_nPts <= 2) {
            return false;
        }
        return true;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPoints()
    {
     if( m_nPts == 1 )
     {
     vector<Point> tempPts( 1 );
     tempPts[0] = Point( m_x1, m_y1 );
     return tempPts;
     }
     vector<Point> tempPts( 2 );
     tempPts[0] = Point( m_x1, m_y1 );
     tempPts[1] = Point( m_x2, m_y2 );
     return tempPts;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getPointsToDraw()
    {
     vector<Point> tempPts( 2 );
     tempPts[0] = Point( m_x1, m_y1 );
     tempPts[1] = Point( m_x2, m_y2 );
     return tempPts;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    getPointsToDraw(_x, _y) {
        /* vector<Point> tempPts( 2 );
          tempPts[0] = Point( m_x1, m_y1 );
          if( m_nPts == 2 )
          {
           tempPts[1] = Point( m_x2, m_y2 );
          }
          else if( m_nPts == 1 )
          {
           tempPts[1] = _pt;
          } */

        var tempPts = Array(2)
        tempPts[0] = (createVector(this.m_x1, this.m_y1));
        if (this.m_nPts == 2) {
            tempPts[1] = (createVector(this.m_x2, this.m_y2));
        }
        else if (this.m_nPts == 1) {
            tempPts[1] = (createVector(_x, _y));
        }

        return tempPts;
    }
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* closestPoint( * _x, * _y )
    {
        let vx = m_x2 - m_x1;
        let vy = m_y2 - m_y1;
        let t = (vx*(*_x-m_x1) + vy*(*_y-m_y1)) / (vx*vx + vy*vy);
        let xOn, yOn;
     if( t < 0.0 )
     {
      xOn = m_x1;
      yOn = m_y1;
     }
     else if( t > 1.0 )
     {
      xOn = m_x2;
      yOn = m_y2;
     }
     else
     {
      xOn = m_x1 + t * vx;
      yOn = m_y1 + t * vy;
     }
     let  dist = sqrt((xOn-*_x)*(xOn-*_x)+(yOn-*_y)*(yOn-*_y));
     *_x = xOn;
     *_y = yOn;
     return dist;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    /* getBoundBox( * _xmin, * _xmax,
                       * _ymin, * _ymax )
    {
     *_xmin = (m_x1 < m_x2) ? m_x1 : m_x2;
     *_xmax = (m_x1 > m_x2) ? m_x1 : m_x2;
     *_ymin = (m_y1 < m_y2) ? m_y1 : m_y2;
     *_ymax = (m_y1 > m_y2) ? m_y1 : m_y2;
    } */
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    setPoints(_x1, _y1, _x2, _y2) {
        this.m_x1 = _x1;
        this.m_x2 = _x2;
        this.m_y1 = _y1;
        this.m_y2 = _y2;
    }
    //-------------------------------------------------------------------------

}

