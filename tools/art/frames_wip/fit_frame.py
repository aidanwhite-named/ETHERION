"""유닛 프레임 그림 → 게임용 프레임 img/ui/frames/frame_<ID>_unit.jpg (600×840)
그림 창(회색)을 재서, 창이 게임 그림 자리(css/frames.css .c-art: x 10.52~97.08% · y 10.38~63.6%)에 오게 구간별로 늘린다.
쓰기: python3 fit_frame.py            (아래 F의 9장 모두)
      python3 fit_frame.py B2 그림.png (한 장)
필요: numpy, opencv-python (pip install numpy opencv-python-headless)"""
import sys,os,cv2,numpy as np
HERE=os.path.dirname(os.path.abspath(__file__)); OUT=os.path.join(HERE,'..','..','..','img','ui','frames')
F={'A1':'A1_unit_gen_v2.png','A2':'A2_unit_gen_v2.png','A3':'A3_unit_gen_v1.png','B1':'B1_unit_gen_v4.png','B2':'B2_unit_gen_v2.png','B3':'B3_unit_gen_v2.png','G1':'G1_unit_gen_v2.png','G2':'G2_unit_gen_v2.png','G3':'G3_unit_gen_v2.png'}
ART=(.1052,.9708,.1038,.636)   # 게임 그림 자리 (x0,x1,y0,y1)
W,H=600,840
def window(im):
    h,w=im.shape[:2]; m=np.zeros((h+2,w+2),np.uint8)
    cv2.floodFill(im.copy(),m,(w//2,int(h*.35)),(0,0,255),(10,10,10),(10,10,10),cv2.FLOODFILL_MASK_ONLY|cv2.FLOODFILL_FIXED_RANGE|(255<<8)|8)
    mm=m[1:-1,1:-1]>0
    xs=[(np.nonzero(mm[int(h*t)])[0][[0,-1]]+[0,1])/w for t in (.25,.35,.45)]
    ys=[(np.nonzero(mm[:,int(w*t)])[0][[0,-1]]+[0,1])/h for t in (.35,.5,.65)]
    return float(np.median([a[0] for a in xs])),float(np.median([a[1] for a in xs])),float(np.median([a[0] for a in ys])),float(np.median([a[1] for a in ys]))
def fit(gid,src):
    im=cv2.imread(src); h,w=im.shape[:2]; x0,x1,y0,y1=window(im)
    kx=[(0,0),(x0,ART[0]),(x1,ART[1]),(1,1)]; ky=[(0,0),(y0,ART[2]),(y1,ART[3]),(1,1)]
    sx=np.interp((np.arange(W)+.5)/W,[b for a,b in kx],[a for a,b in kx])*w-.5
    sy=np.interp((np.arange(H)+.5)/H,[b for a,b in ky],[a for a,b in ky])*h-.5
    # 먼저 줄여서(앨리어싱 방지) 늘림
    small=cv2.resize(im,(W*2,H*2),interpolation=cv2.INTER_AREA); sx2=(sx+.5)*(W*2/w)-.5; sy2=(sy+.5)*(H*2/h)-.5
    MX,MY=np.meshgrid(sx2.astype(np.float32),sy2.astype(np.float32))
    out=cv2.remap(small,MX,MY,cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
    os.makedirs(OUT,exist_ok=True); p=os.path.join(OUT,f'frame_{gid}_unit.jpg')
    cv2.imwrite(p,out,[cv2.IMWRITE_JPEG_QUALITY,90]); print(gid,'창 x %.3f~%.3f y %.3f~%.3f →'%(x0,x1,y0,y1),os.path.relpath(p),os.path.getsize(p)//1024,'KB')
if __name__=='__main__':
    if len(sys.argv)>2: fit(sys.argv[1],sys.argv[2])
    else:
        for g,f in F.items(): fit(g,os.path.join(HERE,f))
