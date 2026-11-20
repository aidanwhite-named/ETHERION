import cv2,numpy as np
X0,X1,Y0,Y1=1330,1470,1837,1977
ims=[cv2.imread(f'images/{i}.webp') for i in range(1,6)]
mn=np.min([im[Y0:Y1,X0:X1].mean(2) for im in ims],0)
core=(mn>40).astype(np.uint8)*255
mask=cv2.dilate(core,np.ones((11,11),np.uint8))
ring=(cv2.dilate(mask,np.ones((21,21),np.uint8))>0)&(mask==0)
feather=cv2.GaussianBlur(mask.astype(float)/255,(9,9),0)[...,None]
W=1493; h,w=Y1-Y0,X1-X0
outs=[]
for i,im in enumerate(ims,1):
    fl=im[:,::-1].astype(float)
    c=im[Y0:Y1,X0:X1].astype(float)
    best=None
    for dy in range(-30,31,2):
        for dx in range(-30,31,2):
            p=fl[Y0+dy:Y1+dy,X0+dx:X1+dx]
            if p.shape!=c.shape: continue
            e=((p-c)**2)[ring].mean()
            if best is None or e<best[0]: best=(e,dx,dy)
    e,dx,dy=best
    for ddy in (-1,0,1):
      for ddx in (-1,0,1):
        p=fl[Y0+dy+ddy:Y1+dy+ddy,X0+dx+ddx:X1+dx+ddx]; ee=((p-c)**2)[ring].mean()
        if ee<e: e,bx,by=ee,dx+ddx,dy+ddy
    p=fl[Y0+dy:Y1+dy,X0+dx:X1+dx]
    # 밝기 차 보정
    p=p+(c[ring].mean(0)-p[ring].mean(0))
    r=c*(1-feather)+p*feather
    o=im.copy(); o[Y0:Y1,X0:X1]=np.clip(r,0,255).astype(np.uint8)
    cv2.imwrite(f'scratchpad/out{i}.png',o); print(i,dx,dy,round(np.sqrt(e),1))
    outs.append(cv2.resize(o[1800:1990,1290:1490],None,fx=2,fy=2))
cv2.imwrite('scratchpad/cmp.png',np.hstack(outs))
